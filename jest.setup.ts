import "@testing-library/jest-dom/extend-expect";

// Why is this needed? https://day.js.org/docs/en/plugin/advanced-format
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
