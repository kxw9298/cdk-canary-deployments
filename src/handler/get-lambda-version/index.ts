import { httpWrapper } from "../../../shared/wrapper/http-wrapper";
import { Handler } from "../../../shared/wrapper/api-gateway";
import { Metrics } from "../../../shared/monitoring/metrics";
import { logger } from "../../../shared/monitoring/logger";
import { MetricUnits } from "@aws-lambda-powertools/metrics";

const serviceName = "getApiVersion";
const nameSpace = serviceName;
const metrics = Metrics.getMetrics(serviceName, nameSpace);
const GET_API_VERSION_CALL = "GetApiVersionCall";
const GET_API_VERSION_CALL_FAILURE = "GetApiVersionCallFailure";

/**
 * Get the API version.
 * @param {APIGatewayEvent} event - An API Gateway event.
 * @returns {string} - The API version as the response body.
 */
export const getApiVersionHandler: Handler<null, { version: string }> = async (
  event
) => {
  try {
    logger.info("this is version: 9");
    logger.info("Received get API version request");
    metrics.addMetric(GET_API_VERSION_CALL, MetricUnits.Count, 1);
    const version = process.env.AWS_LAMBDA_FUNCTION_VERSION || "unknown";
    logger.info("Returning API version", { version });
    return {
      statusCode: 200,
      body: { version },
    };
  } catch (err) {
    const error = err as Error;
    logger.error(error.message, error);
    metrics.addMetric(GET_API_VERSION_CALL_FAILURE, MetricUnits.Count, 1);
    return { statusCode: 500, body: { errorMessage: error.message } };
  }
};

export const main = httpWrapper({
  handler: getApiVersionHandler,
  serviceName,
});