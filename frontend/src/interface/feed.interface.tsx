export type MessageSegmentType = {
  htmlTag?: string;
  markupType?: string;
  tag?: string;
  topicUrl?: string;
  url?: string;
  text: string;
  type: string;
};

export type FeedItemType = {
  actor: {
    additionalLabel: string | null;
    communityNickname: string;
    companyName: string | null;
    displayName: string;
    firstName: string | null;
    id: string;
    isActive: boolean;
    isInThisCommunity: boolean;
    lastName: string;
    motif: {
      color: string;
      largeIconUrl: string;
      mediumIconUrl: string;
      smallIconUrl: string;
      svgIconUrl: null;
    };
    mySubscription: null;
    name: string;
    outOfOffice: {
      message: '';
    };
    photo: {
      fullEmailPhotoUrl: string | null;
      largePhotoUrl: string | null;
      mediumPhotoUrl: string | null;
      photoVersionId: string | null;
      smallPhotoUrl: string | null;
      standardEmailPhotoUrl: string | null;
      url: string | null;
    };
    reputation: string | null;
    stamps: [];
    title: string | null;
    type: string;
    url: string;
    userType: string;
  };
  body: {
    isRichText: boolean;
    messageSegments: MessageSegmentType[];
    text: string;
  };
  capabilities: {
    associatedActions: {
      platformActionGroups: [];
    };
    bookmarks: {
      isBookmarkedByCurrentUser: boolean;
    };
    chatterLikes: {
      isLikedByCurrentUser: boolean;
      likesMessage: null;
      myLike: null;
      page: {
        currentPageToken: number;
        currentPageUrl: string;
        items: [];
        nextPageToken: null;
        nextPageUrl: null;
        previousPageToken: null;
        previousPageUrl: null;
        total: number;
      };
    };
    comments: {
      page: {
        currentPageToken: null;
        currentPageUrl: string;
        items: [];
        nextPageToken: null;
        nextPageUrl: null;
        total: number;
      };
    };
    edit: {
      isEditRestricted: boolean;
      isEditableByMeUrl: string;
      lastEditedBy: null;
      lastEditedDate: null;
      latestRevision: number;
      relativeLastEditedDate: null;
    };
    interactions: {
      count: number;
    };
    mute: {
      isMutedByMe: null;
    };
    readBy: {
      isReadByMe: boolean;
      lastReadDateByMe: string;
      page: {
        currentPageToken: null;
        currentPageUrl: string;
        items: [];
        nextPageToken: null;
        nextPageUrl: null;
        previousPageToken: null;
        previousPageUrl: null;
        total: number;
      };
    };
    status: {
      feedEntityStatus: string;
      isApprovableByMe: boolean;
    };
    topics: {
      canAssignTopics: boolean;
      items: [];
    };
    upDownVote: {
      downVoteCount: number;
      myVote: string;
      upVoteCount: number;
    };
  };
  clientInfo: string | null;
  createdDate: string;
  event: boolean;
  feedElementType: string;
  hasVerifiedComment: boolean;
  header: {
    isRichText: null;
    messageSegments: [
      {
        motif: {
          color: string;
          largeIconUrl: string | null;
          mediumIconUrl: string | null;
          smallIconUrl: string | null;
          svgIconUrl: string | null;
        };
        reference: {
          id: string;
          url: string;
        };
        text: string;
        type: string;
      },
    ];
    text: string;
  };
  id: string;
  isDeleteRestricted: boolean;
  isSharable: boolean;
  modifiedDate: string;
  originalFeedItem: string | null;
  originalFeedItemActor: string | null;
  parent: {
    additionalLabel: null;
    communityNickname: string | null;
    companyName: string | null;
    displayName: string;
    firstName: string | null;
    id: string;
    isActive: boolean;
    isInThisCommunity: boolean;
    lastName: string;
    motif: {
      color: string | null;
      largeIconUrl: string | null;
      mediumIconUrl: string | null;
      smallIconUrl: string | null;
      svgIconUrl: string | null;
    };
    mySubscription: string | null;
    name: string;
    outOfOffice: {
      message: string;
    };
    photo: {
      fullEmailPhotoUrl: string | null;
      largePhotoUrl: string | null;
      mediumPhotoUrl: string | null;
      photoVersionId: string | null;
      smallPhotoUrl: string | null;
      standardEmailPhotoUrl: string | null;
      url: string | null;
    };
    reputation: null;
    stamps: [];
    title: null;
    type: string;
    url: string;
    userType: string;
  };
  photoUrl: string;
  relativeCreatedDate: string;
  type: string;
  url: string;
  visibility: string;
};

export type FeedResponseType = {
  feeds: FeedItemType[];
};
