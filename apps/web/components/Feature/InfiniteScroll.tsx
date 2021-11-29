import { useEffect, useState } from 'react';

interface IInfiniteScrollProps {
  children: React.ReactNode;
  onLoadMore?: () => void;
}

const InfiniteScroll = ({ children, onLoadMore }: IInfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + window.scrollY + 300) >=
      document.documentElement.scrollHeight
    )
      // We can't call "onLoadMore()" directly in here since it will always callback with the outdated (initial) state
      // More info at https://stackoverflow.com/questions/53845595/wrong-react-hooks-behaviour-with-event-listener
      setIsFetching(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    onLoadMore();
    setIsFetching(false);
  }, [isFetching, onLoadMore]);

  return <>{children}</>;
};

export default InfiniteScroll;
