import { useEffect, useState } from 'react';
import { RepositoryPreviewSkeletonLoader } from '../SkeletonLoader/RepositoryPreviewSkeletonLoader';
import {
  githubRepoResponseNormalize,
  RepositoryPreview,
  RepositoryPreviewProps,
} from './RepositoryPreview';

export interface RepositoryPreviewFromGithubProps
  extends Omit<RepositoryPreviewProps, 'repository'> {
  repoNames: [string, string, string];
}

export const FeaturedRepositoriesFromGithub = ({
  repoNames,
  ...props
}: RepositoryPreviewFromGithubProps) => {
  const [repos, setRepos] = useState(null);
  useEffect(() => {
    const main = async () => {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${repoNames
          .map((name) => `repo:${name}`)
          .join(' ')}`
      );
      const json = await response.json();
      setRepos(json.items);
    };

    main();
  }, []);

  if (!repos)
    return (
      <div>
        <RepositoryPreviewSkeletonLoader
          bgColor="normal"
          className="h-full absolute my-4 inset-0 mx-auto order-3 max-w-[12rem] translate-x-20 sm:translate-x-40 scale-[70%]"
          {...props}
        />
        <RepositoryPreviewSkeletonLoader
          bgColor="normal"
          className="h-full absolute my-4 inset-0 mx-auto order-1 max-w-[12rem] -translate-x-20 sm:-translate-x-40 scale-[70%]"
          {...props}
        />
        <RepositoryPreviewSkeletonLoader
          bgColor="normal"
          className="h-full relative order-2 mx-auto max-w-[12rem] scale-90 sm:scale-100"
          {...props}
        />
      </div>
    );

  return (
    <div>
      <RepositoryPreview
        bgColor="normal"
        repository={githubRepoResponseNormalize(repos[0])}
        className="h-full absolute my-4 inset-0 mx-auto order-3 max-w-[12rem] translate-x-20 sm:translate-x-40 scale-[70%]"
        {...props}
      />
      <RepositoryPreview
        bgColor="normal"
        repository={githubRepoResponseNormalize(repos[1])}
        className="h-full absolute my-4 inset-0 mx-auto order-1 max-w-[12rem] -translate-x-20 sm:-translate-x-40 scale-[70%]"
        {...props}
      />
      <RepositoryPreview
        bgColor="normal"
        repository={githubRepoResponseNormalize(repos[2])}
        className="h-full relative order-2 mx-auto max-w-[12rem] scale-90 sm:scale-100"
        {...props}
      />
    </div>
  );
};
