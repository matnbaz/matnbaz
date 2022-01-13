import { useEffect, useState } from 'react';
import { RepositoryPreviewSkeletonLoader } from '../Skeleton Loader/RepositoryPreviewSkeletonLoader';
import {
  githubRepoResponseNormalize,
  IRepositoryPreviewProps,
  RepositoryPreview,
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

  if (!repo) return <RepositoryPreviewSkeletonLoader {...props} />;

  return (
    <RepositoryPreview
      repository={githubRepoResponseNormalize(repo)}
      {...props}
    />
  );
};
