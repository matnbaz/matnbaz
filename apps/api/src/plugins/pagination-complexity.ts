import { ComplexityEstimatorArgs } from '@nestjs/graphql';

export const paginationComplexity = ({
  args: { first, last },
}: ComplexityEstimatorArgs) => {
  if (!first && !last) return 1000;
  if (first) return first;
  if (last) return last;
};
