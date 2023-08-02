var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.jsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_server = require("react-dom/server"), import_node2 = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot"));

// app/shopify.server.js
var import_node = require("@shopify/shopify-app-remix/adapters/node"), import_shopify_app_remix = require("@shopify/shopify-app-remix"), import_shopify_app_session_storage_prisma = require("@shopify/shopify-app-session-storage-prisma"), import__ = require("@shopify/shopify-api/rest/admin/2023-07");

// app/db.server.js
var import_client = require("@prisma/client"), prisma = global.prisma || new import_client.PrismaClient(), db_server_default = prisma;

// app/shopify.server.js
var _a, shopify2 = (0, import_shopify_app_remix.shopifyApp)({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: import_shopify_app_remix.LATEST_API_VERSION,
  scopes: (_a = process.env.SCOPES) == null ? void 0 : _a.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new import_shopify_app_session_storage_prisma.PrismaSessionStorage(db_server_default),
  distribution: import_shopify_app_remix.AppDistribution.AppStore,
  restResources: import__.restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: import_shopify_app_remix.DeliveryMethod.Http,
      callbackUrl: "/webhooks"
    }
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify2.registerWebhooks({ session });
    }
  },
  ...process.env.SHOP_CUSTOM_DOMAIN ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] } : {}
});
var addDocumentResponseHeaders = shopify2.addDocumentResponseHeaders, authenticate = shopify2.authenticate, login = shopify2.login, registerWebhooks = shopify2.registerWebhooks, sessionStorage = shopify2.sessionStorage;

// app/entry.server.jsx
var import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, _loadContext) {
  addDocumentResponseHeaders(request, responseHeaders);
  let callbackName = (0, import_isbot.default)(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        [callbackName]: () => {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node2.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  default: () => App
});
var import_react2 = require("@remix-run/react"), import_jsx_runtime2 = require("react/jsx-runtime");
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Outlet, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.LiveReload, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Scripts, {})
    ] })
  ] });
}

// app/routes/app.additional.jsx
var app_additional_exports = {};
__export(app_additional_exports, {
  default: () => AdditionalPage
});
var import_polaris = require("@shopify/polaris"), import_jsx_runtime3 = require("react/jsx-runtime");
function AdditionalPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_polaris.Page, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ui-title-bar", { title: "Additional page" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_polaris.Layout, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_polaris.Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_polaris.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_polaris.VerticalStack, { gap: "3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_polaris.Text, { as: "p", variant: "bodyMd", children: [
          "The app template comes with an additional page which demonstrates how to create multiple pages within app navigation using",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            import_polaris.Link,
            {
              url: "https://shopify.dev/docs/apps/tools/app-bridge",
              target: "_blank",
              children: "App Bridge"
            }
          ),
          "."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_polaris.Text, { as: "p", variant: "bodyMd", children: [
          "To create your own page and have it show up in the app navigation, add a page inside ",
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Code, { children: "app/routes" }),
          ", and a link to it in the ",
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Code, { children: "<ui-nav-menu>" }),
          " component found in ",
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Code, { children: "app/routes/app.jsx" }),
          "."
        ] })
      ] }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_polaris.Layout.Section, { secondary: !0, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_polaris.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_polaris.VerticalStack, { gap: "2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_polaris.Text, { as: "h2", variant: "headingMd", children: "Resources" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_polaris.List, { spacing: "extraTight", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_polaris.List.Item, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_polaris.Link,
          {
            url: "https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav",
            target: "_blank",
            children: "App nav best practices"
          }
        ) }) })
      ] }) }) })
    ] })
  ] });
}
function Code({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_polaris.Box,
    {
      as: "span",
      padding: "025",
      paddingInlineStart: "1",
      paddingInlineEnd: "1",
      background: "bg-subdued",
      borderWidth: "1",
      borderColor: "border",
      borderRadius: "1",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("code", { children })
    }
  );
}

// app/routes/app._index.jsx
var app_index_exports = {};
__export(app_index_exports, {
  action: () => action,
  default: () => Index,
  loader: () => loader
});
var import_react3 = require("react"), import_node3 = require("@remix-run/node"), import_react4 = require("@remix-run/react"), import_polaris2 = require("@shopify/polaris");
var import_jsx_runtime4 = require("react/jsx-runtime"), loader = async ({ request }) => {
  let { session } = await authenticate.admin(request);
  return (0, import_node3.json)({ shop: session.shop.replace(".myshopify.com", "") });
};
async function action({ request }) {
  let { admin } = await authenticate.admin(request), color = ["Red", "Orange", "Yellow", "Green"][Math.floor(Math.random() * 4)], responseJson = await (await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
          variants: [{ price: Math.random() * 100 }]
        }
      }
    }
  )).json();
  return (0, import_node3.json)({
    product: responseJson.data.productCreate.product
  });
}
function Index() {
  var _a2;
  let nav = (0, import_react4.useNavigation)(), { shop } = (0, import_react4.useLoaderData)(), actionData = (0, import_react4.useActionData)(), submit = (0, import_react4.useSubmit)(), isLoading = ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST", productId = (_a2 = actionData == null ? void 0 : actionData.product) == null ? void 0 : _a2.id.replace(
    "gid://shopify/Product/",
    ""
  );
  (0, import_react3.useEffect)(() => {
    productId && shopify.toast.show("Product created");
  }, [productId]);
  let generateProduct = () => submit({}, { replace: !0, method: "POST" });
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.Page, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("ui-title-bar", { title: "Remix app template", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { variant: "primary", onClick: generateProduct, children: "Generate a product" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.VerticalStack, { gap: "5", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.Layout, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.VerticalStack, { gap: "5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.VerticalStack, { gap: "2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Text, { as: "h2", variant: "headingMd", children: "Congrats on creating a new Shopify app \u{1F389}" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.Text, { variant: "bodyMd", as: "p", children: [
            "This embedded app template uses",
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              import_polaris2.Link,
              {
                url: "https://shopify.dev/docs/apps/tools/app-bridge",
                target: "_blank",
                children: "App Bridge"
              }
            ),
            " ",
            "interface examples like an",
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Link, { url: "/app/additional", children: "additional page in the app nav" }),
            ", as well as an",
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              import_polaris2.Link,
              {
                url: "https://shopify.dev/docs/api/admin-graphql",
                target: "_blank",
                children: "Admin GraphQL"
              }
            ),
            " ",
            "mutation demo, to provide a starting point for app development."
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.VerticalStack, { gap: "2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Text, { as: "h3", variant: "headingMd", children: "Get started with products" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.Text, { as: "p", variant: "bodyMd", children: [
            "Generate a product with GraphQL and get the JSON output for that product. Learn more about the",
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              import_polaris2.Link,
              {
                url: "https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate",
                target: "_blank",
                children: "productCreate"
              }
            ),
            " ",
            "mutation in our API references."
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.HorizontalStack, { gap: "3", align: "end", children: [
          (actionData == null ? void 0 : actionData.product) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            import_polaris2.Button,
            {
              url: `https://admin.shopify.com/store/${shop}/admin/products/${productId}`,
              target: "_blank",
              children: "View product"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Button, { loading: isLoading, primary: !0, onClick: generateProduct, children: "Generate a product" })
        ] }),
        (actionData == null ? void 0 : actionData.product) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          import_polaris2.Box,
          {
            padding: "4",
            background: "bg-subdued",
            borderColor: "border",
            borderWidth: "1",
            borderRadius: "2",
            overflowX: "scroll",
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("pre", { style: { margin: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("code", { children: JSON.stringify(actionData.product, null, 2) }) })
          }
        )
      ] }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Layout.Section, { secondary: !0, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.VerticalStack, { gap: "5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.VerticalStack, { gap: "2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Text, { as: "h2", variant: "headingMd", children: "App template specs" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.VerticalStack, { gap: "2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Divider, {}),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.HorizontalStack, { align: "space-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Text, { as: "span", variant: "bodyMd", children: "Framework" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Link, { url: "https://remix.run", target: "_blank", children: "Remix" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Divider, {}),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.HorizontalStack, { align: "space-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Text, { as: "span", variant: "bodyMd", children: "Database" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Link, { url: "https://www.prisma.io/", target: "_blank", children: "Prisma" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Divider, {}),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.HorizontalStack, { align: "space-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Text, { as: "span", variant: "bodyMd", children: "Interface" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Link, { url: "https://polaris.shopify.com", target: "_blank", children: "Polaris" }),
                ", ",
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  import_polaris2.Link,
                  {
                    url: "https://shopify.dev/docs/apps/tools/app-bridge",
                    target: "_blank",
                    children: "App Bridge"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Divider, {}),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.HorizontalStack, { align: "space-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Text, { as: "span", variant: "bodyMd", children: "API" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                import_polaris2.Link,
                {
                  url: "https://shopify.dev/docs/api/admin-graphql",
                  target: "_blank",
                  children: "GraphQL API"
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.VerticalStack, { gap: "2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_polaris2.Text, { as: "h2", variant: "headingMd", children: "Next steps" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.List, { spacing: "extraTight", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.List.Item, { children: [
              "Build an",
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
                import_polaris2.Link,
                {
                  url: "https://shopify.dev/docs/apps/getting-started/build-app-example",
                  target: "_blank",
                  children: [
                    " ",
                    "example app"
                  ]
                }
              ),
              " ",
              "to get started"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_polaris2.List.Item, { children: [
              "Explore Shopify\u2019s API with",
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                import_polaris2.Link,
                {
                  url: "https://shopify.dev/docs/apps/tools/graphiql-admin-api",
                  target: "_blank",
                  children: "GraphiQL"
                }
              )
            ] })
          ] })
        ] }) })
      ] }) })
    ] }) })
  ] });
}

// app/routes/auth.login/route.jsx
var route_exports = {};
__export(route_exports, {
  action: () => action2,
  default: () => Auth,
  links: () => links,
  loader: () => loader2
});
var import_react5 = require("react"), import_node4 = require("@remix-run/node"), import_polaris3 = require("@shopify/polaris"), import_react6 = require("@remix-run/react");

// node_modules/@shopify/polaris/build/esm/styles.css
var styles_default = "/build/_assets/styles-5WQFCVKN.css";

// app/routes/auth.login/error.server.jsx
var import_shopify_app_remix2 = require("@shopify/shopify-app-remix");
function loginErrorMessage(loginErrors) {
  return (loginErrors == null ? void 0 : loginErrors.shop) === import_shopify_app_remix2.LoginErrorType.MissingShop ? { shop: "Please enter your shop domain to log in" } : (loginErrors == null ? void 0 : loginErrors.shop) === import_shopify_app_remix2.LoginErrorType.InvalidShop ? { shop: "Please enter a valid shop domain to log in" } : {};
}

// app/routes/auth.login/route.jsx
var import_jsx_runtime5 = require("react/jsx-runtime"), links = () => [{ rel: "stylesheet", href: styles_default }];
async function loader2({ request }) {
  let errors = loginErrorMessage(await login(request));
  return (0, import_node4.json)({
    errors,
    polarisTranslations: require("@shopify/polaris/locales/en.json")
  });
}
async function action2({ request }) {
  let errors = loginErrorMessage(await login(request));
  return (0, import_node4.json)({
    errors
  });
}
function Auth() {
  let { polarisTranslations } = (0, import_react6.useLoaderData)(), loaderData = (0, import_react6.useLoaderData)(), actionData = (0, import_react6.useActionData)(), [shop, setShop] = (0, import_react5.useState)(""), { errors } = actionData || loaderData;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_polaris3.AppProvider, { i18n: polarisTranslations, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_polaris3.Page, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_polaris3.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react6.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_polaris3.FormLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_polaris3.Text, { variant: "headingMd", as: "h2", children: "Log in" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      import_polaris3.TextField,
      {
        type: "text",
        name: "shop",
        label: "Shop domain",
        helpText: "example.myshopify.com",
        value: shop,
        onChange: setShop,
        autoComplete: "on",
        error: errors.shop
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_polaris3.Button, { submit: !0, children: "Log in" })
  ] }) }) }) }) });
}

// app/routes/webhooks.jsx
var webhooks_exports = {};
__export(webhooks_exports, {
  action: () => action3
});
var action3 = async ({ request }) => {
  let { topic, shop, session } = await authenticate.webhook(request);
  switch (topic) {
    case "APP_UNINSTALLED":
      session && await db_server_default.session.deleteMany({ where: { shop } });
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }
  throw new Response();
};

// app/routes/_index/route.jsx
var route_exports2 = {};
__export(route_exports2, {
  default: () => App2,
  links: () => links2,
  loader: () => loader3
});
var import_node5 = require("@remix-run/node"), import_react7 = require("@remix-run/react");

// app/routes/_index/style.css
var style_default = "/build/_assets/style-6S2Q7E3W.css";

// app/routes/_index/route.jsx
var import_jsx_runtime6 = require("react/jsx-runtime"), links2 = () => [{ rel: "stylesheet", href: style_default }];
async function loader3({ request }) {
  let url = new URL(request.url);
  if (url.searchParams.get("shop"))
    throw (0, import_node5.redirect)(`/app?${url.searchParams.toString()}`);
  return (0, import_node5.json)({ showForm: Boolean(login) });
}
function App2() {
  let { showForm } = (0, import_react7.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "index", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "content", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h1", { children: "A short heading about [your app]" }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: "A tagline about [your app] that describes your value proposition." }),
    showForm && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react7.Form, { method: "post", action: "/auth/login", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "Shop domain" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { type: "text", name: "shop" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "e.g: my-shop-domain.myshopify.com" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "submit", children: "Log in" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("ul", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] })
    ] })
  ] }) });
}

// app/routes/auth.$.jsx
var auth_exports = {};
__export(auth_exports, {
  loader: () => loader4
});
async function loader4({ request }) {
  return await authenticate.admin(request), null;
}

// app/routes/app.jsx
var app_exports = {};
__export(app_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App3,
  headers: () => headers,
  links: () => links3,
  loader: () => loader5
});
var import_react8 = __toESM(require("react")), import_node6 = require("@remix-run/node"), import_react9 = require("@remix-run/react"), import_polaris4 = require("@shopify/polaris");
var import_shopify_app_remix3 = require("@shopify/shopify-app-remix");
var import_jsx_runtime7 = require("react/jsx-runtime"), links3 = () => [{ rel: "stylesheet", href: styles_default }];
async function loader5({ request }) {
  return await authenticate.admin(request), (0, import_node6.json)({
    polarisTranslations: require("@shopify/polaris/locales/en.json"),
    apiKey: process.env.SHOPIFY_API_KEY
  });
}
function App3() {
  let { apiKey, polarisTranslations } = (0, import_react9.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "script",
      {
        src: "https://cdn.shopify.com/shopifycloud/app-bridge.js",
        "data-api-key": apiKey
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("ui-nav-menu", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react9.Link, { to: "/app", rel: "home", children: "Home" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react9.Link, { to: "/app/additional", children: "Additional page" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      import_polaris4.AppProvider,
      {
        i18n: polarisTranslations,
        linkComponent: RemixPolarisLink,
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react9.Outlet, {})
      }
    )
  ] });
}
var RemixPolarisLink = import_react8.default.forwardRef(
  (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react9.Link, { ...props, to: props.url ?? props.to, ref, children: props.children })
);
function ErrorBoundary() {
  return import_shopify_app_remix3.boundary.error((0, import_react9.useRouteError)());
}
var headers = (headersArgs) => import_shopify_app_remix3.boundary.headers(headersArgs);

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-LDMTQZAH.js", imports: ["/build/_shared/chunk-ZBDK2LSI.js", "/build/_shared/chunk-I75X6G2I.js", "/build/_shared/chunk-3RWUHEQO.js", "/build/_shared/chunk-G5WX4PPA.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-NA6ICZ7G.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-5X756FPH.js", imports: ["/build/_shared/chunk-I3MD2JUC.js", "/build/_shared/chunk-5TRFQBKG.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/app": { id: "routes/app", parentId: "root", path: "app", index: void 0, caseSensitive: void 0, module: "/build/routes/app-YV7S3MME.js", imports: ["/build/_shared/chunk-6UARRT53.js", "/build/_shared/chunk-W64OBUQM.js", "/build/_shared/chunk-S5VEJNDF.js", "/build/_shared/chunk-5TRFQBKG.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/app._index": { id: "routes/app._index", parentId: "routes/app", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/app._index-DCDZKNAE.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/app.additional": { id: "routes/app.additional", parentId: "routes/app", path: "additional", index: void 0, caseSensitive: void 0, module: "/build/routes/app.additional-IFLEULX6.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth.$": { id: "routes/auth.$", parentId: "root", path: "auth/*", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.$-NFZDY2LY.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth.login": { id: "routes/auth.login", parentId: "root", path: "auth/login", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.login-673T7MFX.js", imports: ["/build/_shared/chunk-W64OBUQM.js", "/build/_shared/chunk-S5VEJNDF.js", "/build/_shared/chunk-I3MD2JUC.js", "/build/_shared/chunk-5TRFQBKG.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/webhooks": { id: "routes/webhooks", parentId: "root", path: "webhooks", index: void 0, caseSensitive: void 0, module: "/build/routes/webhooks-7SE24AHG.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "343575dc", hmr: void 0, url: "/build/manifest-343575DC.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_dev: { port: 8002 }, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_headers: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/app.additional": {
    id: "routes/app.additional",
    parentId: "routes/app",
    path: "additional",
    index: void 0,
    caseSensitive: void 0,
    module: app_additional_exports
  },
  "routes/app._index": {
    id: "routes/app._index",
    parentId: "routes/app",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: app_index_exports
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: webhooks_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: route_exports2
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/app": {
    id: "routes/app",
    parentId: "root",
    path: "app",
    index: void 0,
    caseSensitive: void 0,
    module: app_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
