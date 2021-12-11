import { useEffect, useState } from 'react';

interface IInfiniteScrollProps {
  children: React.ReactNode;
  dataLength: number;
  onLoadMore?: () => void;
}

const InfiniteScroll = ({
  children,
  dataLength,
  onLoadMore,
}: IInfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (document.body.clientHeight > window.innerHeight) return;
    setIsFetching(true);
  }, [dataLength]);

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
