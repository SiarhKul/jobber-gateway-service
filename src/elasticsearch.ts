import { Logger } from 'winston';
import { config } from './config';
import { winstonLogger } from '@SiarhKul/jobber-shared';
import { Client } from '@elastic/elasticsearch';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'gatewayServerElasticConnection',
  'debug'
);

class ElasticSearch {
  private elasticSearchClient: Client;

  constructor() {
    this.elasticSearchClient = new Client({
      node: `${config.ELASTIC_SEARCH_URL}`
    });
  }

  public async checkConnection(): Promise<void> {
    let isConnected = false;

    while (!isConnected) {
      try {
        const health = await this.elasticSearchClient.cluster.health({});

        log.info(`GatewayService Elasticsearch health status - ${health.status}`);

        isConnected = true;
      } catch (error) {
        log.error('Connection to Elasticsearch failed. Retrying...');

        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }
}

export const elasticSearch: ElasticSearch = new ElasticSearch();
