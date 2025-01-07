import { Prisma } from '@prisma/client';

export type IUserProfile = Prisma.UserGetPayload<{
  include: {
    ownedOrganization: true;
    memberOfOrganizations: true;
  };
}>;

export type IGetProfileResponse = IUserProfile;
