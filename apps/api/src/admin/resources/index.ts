import { languageResource } from './language.resource';
import { licenseResource } from './license.resource';
import { ownerResource } from './owner.resource';
import { reportResource } from './report.resource';
import { repositoryResource } from './repository.resource';
import { ResourceContext } from './resource-type';
import { submissionResource } from './submission.resource';
import { topicResource } from './topic.resource';

const resources = [
  repositoryResource,
  ownerResource,
  languageResource,
  topicResource,
  licenseResource,
  reportResource,
  submissionResource,
];

export const getResources = (context: ResourceContext) =>
  resources.map((resource) => resource(context));
