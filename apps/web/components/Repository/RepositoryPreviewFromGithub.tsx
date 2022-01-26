import { useEffect, useState } from 'react';
import { RepositoryPreviewSkeletonLoader } from '../SkeletonLoader/RepositoryPreviewSkeletonLoader';
import {
  githubRepoResponseNormalize,
  RepositoryPreview,
  RepositoryPreviewProps,
} from './RepositoryPreview';

export interface RepositoryPreviewFromGithubProps
  extends Omit<RepositoryPreviewProps, 'repository'> {
  fullName: string;
}

export const RepositoryPreviewFromGithub = ({
  fullName,

  ...props
}: RepositoryPreviewFromGithubProps) => {
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
