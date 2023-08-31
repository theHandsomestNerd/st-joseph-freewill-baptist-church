import "dotenv/config";
import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import * as admin from "firebase-admin";
import * as logClient from "./logClient";
import * as cmsClient from "./cmsClient";
import * as Promise from "es6-promise";
import * as path from "path";
import * as fs from "fs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import helmet from "helmet";

// import {urlFor} from
//   "../../src/components/block-content-ui/static-pages/cmsStaticPagesClient";
import sendGridClient from "./sendGridClient";
import imageUrlBuilder from "@sanity/image-url";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import {sanityClient} from "./sanityClient";
import axios from "axios";

const builder = imageUrlBuilder(sanityClient);
// To Throttle requests to sanity

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

Promise.polyfill();

const app = express();
const corsOptionsDelegate = (req: any, callback: any) => {
  logClient.log("CORS", "NOTICE", "checking allowlist", {origin: req.header("Origin")});
  // let corsOptions;
  // if (allowlist.indexOf(req.header("Origin")) !== -1) {
  //   logClient.log("CORS", LogLevels.NOTICE, "origin in allowlist", {origin: req.header("Origin"), allowlist});
  //   corsOptions = {origin: allowlist}; // reflect (enable) the requested origin in the CORS response
  // } else {
  //   logClient.log("CORS", LogLevels.NOTICE, "origin NOT in allowlist", {origin: req.header("Origin"), allowlist});
  //   corsOptions = {origin: false}; // disable CORS for this request
  // }
  const corsOptions = {origin: true};

  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));
// app.use(cors());

// app.use(
//     helmet({
//       crossOriginResourcePolicy: false,
//       contentSecurityPolicy: {
//         directives: {
//           defaultSrc: ["'self'"],
//           connectSrc: ["'self'", "http://127.0.0.1:5002", "ws://localhost:3000/", "https://firebase.googleapis.com/"],
//         },
//       },
//     })
// );
admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
});

// Custom logger to keep log messages together in one json
const Logger = function(req: any, res: any, next: any) {
  logClient.createLogger(req, res, next);
  next();
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
// app.use(require("prerender-node")
// .set("prerenderToken", process.env.PRERENDER_TOKEN));


app.use(Logger);
// https://blog.logrocket.com/adding-dynamic-meta-tags-react-app-without-ssr/
app.get("/*", (req, res, next) => {
  logClient.log("server-side", "NOTICE",
      "Hello from the Server Siiiiiide", req.params);

  logClient.log("server-side", "NOTICE",
      "index path", indexPath);

  serveIndexFile(req, res);
});

app.get("/", (req, res, next) => {
  logClient.log("server-side", "NOTICE",
      "Serving Index instead of hosting", req.params);

  serveIndexFile(req, res);
});

app.get("/index.html", (req, res, next) => {
  logClient.log("server-side", "NOTICE",
      "Serving Index instead of hosting", req.params);

  serveIndexFile(req, res);
});

console.log(__dirname + " " + "../../../../" + "build");

const devIndexPath: string[] = [];
const prodIndexPath: string[] = [];
const indexPathParts = process.env.SANITY_DB === "production" ? prodIndexPath : devIndexPath;
const files = fs.readdirSync(path.resolve(__dirname, ...indexPathParts));

const indexPath = path.resolve(__dirname, ...indexPathParts, "index.html");

console.log(path.resolve(__dirname, ...indexPathParts), files);

const serveIndexFile = (req: any, res: any) => {
  fs.readFile(indexPath, "utf8", async (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }

    // TODO get info from sanity info
    const params: any = req.params;
    const tokenizedParams = params["0"].split("/");

    let pageSlug = tokenizedParams[tokenizedParams.length - 1];

    if (!pageSlug) {
      pageSlug = "home";
    }

    logClient.log("server-side", "NOTICE",
        "Loading this page from sanity", pageSlug);
    try {
      const pageFromSanity: any = await cmsClient.fetchPage(pageSlug);

      // console.log("IMAGE URL", pageFromSanity.metaImage && urlFor(pageFromSanity.metaImage).url()?.replace("undefined", process.env.SANITY_DB ?? "development"));
      const page = {
        ogTitle: pageFromSanity?.title,
        description: pageFromSanity?.description,
        ogDescription: pageFromSanity?.description,
        ogImage: pageFromSanity?.metaImage && urlFor(pageFromSanity?.metaImage).url()?.replace("undefined", process.env.SANITY_DB ?? "development"),
      };

      logClient.log("server-side", "NOTICE",
          "MetaTag Data", page);

      htmlData = htmlData.replace(
          "<title>React App</title>",
          `<title>${page.ogTitle}</title>`)
          .replace("__META_OG_TITLE__", page.ogTitle ?? "")
          .replace("__META_OG_DESCRIPTION__", page.description ?? "")
          .replace("__META_DESCRIPTION__", page.ogDescription ?? "")
          .replace("__META_OG_IMAGE__", page.ogImage ?? "");

      return res.send(htmlData);
    } catch (e: any) {
      logClient.log("server-side", "ERROR",
          "Error Fetching Page", {pageSlug, error: e.message});
      return res.send({status: "404", message: e.message});
    }
  });
};

app.post("/send-email-resume",
    async (req: any, functionRes: any) => {
      functions.logger.log("send-email-address", "NOTICE",
          "send-email-address-request");
      const reqBody: any = JSON.parse(req.body);

      functions.logger.log("send-email-address", "NOTICE",
          "Request to collect an email address and send them an email", reqBody.email);

      try {
        const response = await cmsClient.createColdLead({
          email: reqBody.email,
          leadPhone: reqBody.leadPhone,
          leadMessage: reqBody.leadMessage,
          leadName: reqBody.leadName,
          source: reqBody.source,
        });
        console.log("Cold Lead Created before Resume send.", response);
        // functionRes.send({status: "200", response, email: reqBody.email, message: "Thank you! We will talk soon."});
      } catch (e) {
        logClient.log("collect-email-address", "ERROR",
            "Could not create Lead", {email: reqBody.email});
        // functionRes.send({status: "400", e});
      }

      try {
        const response = await sendGridClient.sendLeadEmail(reqBody.email);
        console.log(`Resume send attempt to ${reqBody.email}:`, response);
        functionRes.send({status: "200", response, email: reqBody.email, message: "Success"});
      } catch (e) {
        logClient.log("collect-email-address", "ERROR",
            "Could not create Lead", {email: reqBody.email});
        functionRes.send({status: "400", e});
      }
    });

app.post("/collect-email-address",
    async (req: any, functionRes: any) => {
      const reqBody: any = JSON.parse(req.body);

      logClient.log("collect-email-address", "NOTICE",
          "Request to collect an email address", reqBody.email);

      try {
        const response = await cmsClient.createColdLead({
          email: reqBody.email,
          leadPhone: reqBody.leadPhone,
          leadMessage: reqBody.leadMessage,
          leadName: reqBody.leadName,
          source: reqBody.source,
        });
        functionRes.send({status: "200", response, email: reqBody.email, message: "Thank you! We will talk soon."});
      } catch (e) {
        logClient.log("collect-email-address", "ERROR",
            "Could not create Lead", {email: reqBody.email});
        functionRes.send({status: "400", e});
      }
    });

app.post("/get-insta-image", async (req: any, functionRes: any) => {
  const reqParams: any = JSON.parse(req.body);
  console.log("get-insta-image request body", reqParams.url);


  // return req.pipe(request(reqParams.url)).pipe(functionRes);

  return axios.get(reqParams.url, {
    responseType: "arraybuffer",
  })
      .then(function(response) {
        // handle success
        // if (response.data) {
        return functionRes.send({
          imageData: Buffer.from(response.data, "binary").toString("base64"),
          imageUrl: response.request.res.responseUrl,
        });
        // }
      });
});

app.use(express.static(
    path.resolve(__dirname, "../../../../", "build"),
    {maxAge: "30d", index: "blah.txt"},
));

exports.app = functions.https.onRequest(app);

