import { useEffect, useState } from 'react';
import {
  OwnerType,
  PlatformType,
  ScriptDirection,
} from '../../lib/graphql-types';
import RepositoryPreviewSkeletonLoader from '../Skeleton Loader/RepositoryPreviewSkeletonLoader';
import RepositoryPreview, {
  IRepositoryPreviewProps,
} from './RepositoryPreview';

export interface IRepositoryPreviewFromGithubProps
  extends Omit<IRepositoryPreviewProps, 'repository'> {
  fullName: string;
}

export const RepositoryPreviewFromGithub = ({
  fullName,
  ...props
}: IRepositoryPreviewFromGithubProps) => {
  const [repo, setRepo] = useState(null);
  useEffect(() => {
    const main = async () => {
      const response = await fetch(`https://api.github.com/repos/${fullName}`);
      const json = await response.json();
      setRepo(json);
    };

    main();
  }, []);

  const commonColorsTable = {
    Vue: '#4FC08D',
    Php: '#777BB4',
    Shell: '#89e051',
  };

  if (!repo) return <RepositoryPreviewSkeletonLoader {...props} />;

  return (
    <RepositoryPreview
      repository={{
        id: repo.id.toString(),
        isNew: false,
        platform: PlatformType.GitHub,
        owner: {
          login: repo.owner.login,
          platformId: repo.owner.id,
          type:
            repo.owner.type === 'Organization'
              ? OwnerType.Organization
              : OwnerType.User,
        },
        descriptionLimited: repo.description,
        forksCount: repo.forks_count,
        openIssuesCount: repo.open_issues_count,
        stargazersCount: repo.stargazers_count,
        fullName: repo.full_name,
        language: {
          __typename: 'Language',
          name: repo.language,
          color: {
            hexString: commonColorsTable[repo.language] || '#1e90ff',
          },
        },
        descriptionDirection: ScriptDirection.Ltr,
      }}
      {...props}
    />
  );
};
