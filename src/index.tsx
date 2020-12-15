import * as React from "react";
import * as ReactDOM from "react-dom";

// Why is this needed? https://day.js.org/docs/en/plugin/advanced-format
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

// Why is this needed? https://react-bootstrap.github.io/getting-started/introduction/#css
import "bootstrap/dist/css/bootstrap.min.css";

import Widget from "./components/Widget";

dayjs.extend(advancedFormat);

ReactDOM.render(<Widget />, document.getElementById("output"));
