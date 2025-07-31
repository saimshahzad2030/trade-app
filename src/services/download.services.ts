import { saveAs } from "file-saver";
import { axiosInstanceJson } from "../../axios/axiosInstance";
import formatDate from '../utils/formatDate'
export const downloadHistoricalDataCsv = async (
  symbol: string,
  startDate: string,
  endDate: string
) => {
  try {
    const response = await axiosInstanceJson.get(
      `download-historical-csv/${symbol}/${startDate}/${formatDate(endDate)}`,
      {
        responseType: "blob", // IMPORTANT: tells axios to handle the response as a file
      }
    );

    const blob = new Blob([response.data], { type: "text/csv;charset=utf-8" });
    const fileName = `${symbol}_historical_data_${startDate}_to_${endDate}.csv`;
    saveAs(blob, fileName);

    return {
      status: response.status,
      success: true,
    };
  } catch (err) {
    const error = err as {
      response: { status: number; data: string };
    };
    return {
      status: error.response?.status || 500,
      success: false,
      error: error.response?.data || "Failed to download file",
    };
  }
};

export const downloadFinancialDataCsv = async (
  symbol: string,
  quarter: string,
  type: string
) => {
  try {
    const response = await axiosInstanceJson.get(
      `financials/${symbol}/${quarter}/${type}/csv`,
      {
        responseType: "blob", // IMPORTANT: tells axios to handle the response as a file
      }
    );

    const blob = new Blob([response.data], { type: "text/csv;charset=utf-8" });
    const fileName = `${symbol}(${type}-${quarter}).csv`;
    saveAs(blob, fileName);

    return {
      status: response.status,
      success: true,
    };
  } catch (err) {
    const error = err as {
      response: { status: number; data: string };
    };
    return {
      status: error.response?.status || 500,
      success: false,
      error: error.response?.data || "Failed to download file",
    };
  }
};
