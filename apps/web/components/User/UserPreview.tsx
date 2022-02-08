import { Card, CardProps } from '../UI/Card';

export interface UserPreviewProps extends Omit<CardProps, 'children'> {
  user: {
    id: string;
    name?: string;
    username: string;
    bio?: string;
    avatar?: string;
  };
}

export const UserPreview = ({ user, ...props }: UserPreviewProps) => {
  return (
    <Card
      // TODO: href={`/users/${user.username}`}
      {...props}
    >
      <div className="flex flex-col sm:flex-row gap-3 ltr:text-left rtl:text-right">
        <div className="flex-shrink-0">
          <img
            width={72}
            height={72}
            src={
              user.avatar ||
              `https://ui-avatars.com/api/?name=${user.name || user.username}`
            }
            alt={`عکس پروفایل ${user.name || user.username}`}
            className="rounded-full"
          />
        </div>
        <div>
          {user.name && <div className="text-xl font-bold">{user.name}</div>}
          <div className="text-sm mt-1" dir="ltr">
            @{user.username}
          </div>
          {user.bio && (
            <p className="mt-1 text-secondary text-sm">{user.bio}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
