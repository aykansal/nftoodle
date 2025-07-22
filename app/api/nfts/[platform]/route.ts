import { NextRequest, NextResponse } from 'next/server';
// import { Platforms } from '@prisma/client';

const query = `
query CollectionItemsListQuery($cursor: String, $sort: CollectionItemsSort!, $filter: CollectionItemsFilter, $collectionSlug: String!, $limit: Int, $address: Address) {
  collectionItems(
    collectionSlug: $collectionSlug
    cursor: $cursor
    sort: $sort
    filter: $filter
    limit: $limit
  ) {
    items {
      id
      ...CollectionItemsCardFragment
      ...CollectionItemsTableRowFragment
      rarity {
        rank
        __typename
      }
      createdAt
      lastSaleAt
      lastTransferAt
      ...ItemOwnedQuantity
      enforcement {
        isDelisted
        isCompromised
        __typename
      }
      bestListing {
        pricePerItem {
          token {
            unit
            __typename
          }
          __typename
        }
        startTime
        marketplace {
          identifier
          __typename
        }
        __typename
      }
      bestOffer {
        pricePerItem {
          usd
          token {
            unit
            __typename
          }
          __typename
        }
        __typename
      }
      lastSale {
        native {
          unit
          __typename
        }
        __typename
      }
      version
      ...collectionItemsPurchaseSelection
      ...collectionItemsSellSelection
      __typename
    }
    nextPageCursor
    __typename
  }
}
fragment CollectionItemsCardFragment on Item {
  id
  chain {
    identifier
    __typename
  }
  contractAddress
  tokenId
  isFungible
  lastSale {
    ...TokenPrice
    __typename
  }
  totalSupply
  bestListing {
    id
    pricePerItem {
      ...TokenPrice
      __typename
    }
    marketplace {
      identifier
      __typename
    }
    quantityRemaining
    maker {
      address
      __typename
    }
    endTime
    ...useCancelOrders
    __typename
  }
  enforcement {
    isDisabled
    isCompromised
    __typename
  }
  ...bestItemOffer
  ...ItemOwnedQuantity
  ...useAcceptOffers
  ...useBuyItems
  ...useListItems
  ...EnforcementBadge
  ...ItemCardMedia
  ...ItemCardNameFragment
  ...QuantityBadge
  ...RarityBadgeFragment
  ...ItemLink
  ...useCancelItemsListings
  ...isItemTradable
  __typename
}
fragment ItemCardMedia on Item {
  id
  tokenId
  ...ItemMedia
  __typename
}
fragment ItemMedia on Item {
  imageUrl
  animationUrl
  backgroundColor
  collection {
    imageUrl
    __typename
  }
  __typename
}
fragment ItemCardNameFragment on Item {
  name
  __typename
}
fragment QuantityBadge on Item {
  bestListing {
    quantityRemaining
    __typename
  }
  totalSupply
  __typename
}
fragment RarityBadgeFragment on Item {
  rarity {
    rank
    category
    __typename
  }
  ...RarityTooltip
  ...isItemRarityDisabled
  __typename
}
fragment RarityTooltip on Item {
  rarity {
    category
    rank
    totalSupply
    __typename
  }
  ...isItemRarityDisabled
  __typename
}
fragment isItemRarityDisabled on Item {
  collection {
    id
    slug
    __typename
  }
  __typename
}
fragment ItemLink on BaseItem {
  ...itemUrl
  chain {
    identifier
    __typename
  }
  tokenId
  contractAddress
  imageUrl
  animationUrl
  ...useSetItemQuickView
  __typename
}
fragment itemUrl on ItemIdentifier {
  chain {
    identifier
    arch
    __typename
  }
  tokenId
  contractAddress
  __typename
}
fragment useSetItemQuickView on Item {
  ...itemUrl
  ...ItemViewModal
  __typename
}
fragment ItemViewModal on Item {
  tokenId
  imageUrl
  id
  name
  ...itemIdentifier
  ...ItemViewSkeleton
  ...itemUrl
  __typename
}
fragment itemIdentifier on ItemIdentifier {
  chain {
    identifier
    __typename
  }
  tokenId
  contractAddress
  __typename
}
fragment ItemViewSkeleton on Item {
  name
  ...ItemPageMedia
  ...ItemTabs
  ...ItemAbout
  __typename
}
fragment ItemPageMedia on Item {
  ...ItemMedia
  __typename
}
fragment ItemTabs on Item {
  isFungible
  collection {
    slug
    __typename
  }
  __typename
}
fragment ItemAbout on Item {
  id
  name
  tokenId
  tokenUri
  contractAddress
  chain {
    name
    identifier
    arch
    __typename
  }
  standard
  description
  details {
    name
    value
    __typename
  }
  collection {
    ...CollectionOwner
    name
    description
    owner {
      displayName
      ...AccountLockup
      __typename
    }
    __typename
  }
  __typename
}
fragment CollectionOwner on Collection {
  owner {
    displayName
    isVerified
    address
    ...profileUrl
    ...ProfilePreviewTooltip
    __typename
  }
  standard
  __typename
}
fragment profileUrl on ProfileIdentifier {
  address
  __typename
}
fragment ProfilePreviewTooltip on ProfileIdentifier {
  address
  ...ProfilePreviewTooltipContent
  __typename
}
fragment ProfilePreviewTooltipContent on ProfileIdentifier {
  address
  __typename
}
fragment AccountLockup on ProfileIdentifier {
  address
  displayName
  imageUrl
  ...profileUrl
  __typename
}
fragment TokenPrice on Price {
  usd
  token {
    unit
    symbol
    contractAddress
    chain {
      identifier
      __typename
    }
    __typename
  }
  __typename
}
fragment useBuyItems on Item {
  chain {
    identifier
    arch
    __typename
  }
  contractAddress
  tokenId
  collection {
    slug
    isTradingDisabled
    __typename
  }
  bestListing {
    pricePerItem {
      token {
        unit
        address
        symbol
        ...currencyIdentifier
        __typename
      }
      __typename
    }
    maker {
      address
      __typename
    }
    __typename
  }
  ...isItemListed
  ...isItemTradable
  __typename
}
fragment isItemListed on Item {
  bestListing {
    __typename
  }
  __typename
}
fragment isItemTradable on Item {
  collection {
    isTradingDisabled
    __typename
  }
  enforcement {
    isCompromised
    isDisabled
    __typename
  }
  isTradingDisabled
  __typename
}
fragment currencyIdentifier on ContractIdentifier {
  contractAddress
  chain {
    identifier
    __typename
  }
  __typename
}
fragment useListItems on Item {
  tokenId
  chain {
    identifier
    arch
    __typename
  }
  collection {
    isTradingDisabled
    __typename
  }
  contractAddress
  ...ItemOwnedQuantity
  ...isItemTradable
  __typename
}
fragment ItemOwnedQuantity on Item {
  ownership(address: $address) {
    id
    quantity
    __typename
  }
  __typename
}
fragment EnforcementBadge on EnforcedEntity {
  __typename
  enforcement {
    isCompromised
    isDisabled
    isOwnershipDisputed
    __typename
  }
}
fragment useAcceptOffers on Item {
  chain {
    identifier
    arch
    __typename
  }
  contractAddress
  tokenId
  collection {
    isTradingDisabled
    __typename
  }
  bestOffer {
    pricePerItem {
      token {
        unit
        address
        __typename
      }
      __typename
    }
    maker {
      address
      __typename
    }
    __typename
  }
  enforcement {
    isCompromised
    __typename
  }
  __typename
}
fragment useCancelItemsListings on Item {
  chain {
    arch
    identifier
    __typename
  }
  contractAddress
  tokenId
  lowestListingForOwner(address: $address) {
    __typename
  }
  __typename
}
fragment useCancelOrders on BaseOrder {
  id
  marketplace {
    identifier
    __typename
  }
  maker {
    address
    __typename
  }
  __typename
}
fragment bestItemOffer on Item {
  bestItemOffer {
    pricePerItem {
      native {
        unit
        __typename
      }
      ...TokenPrice
      __typename
    }
    maker {
      address
      __typename
    }
    __typename
  }
  collection {
    id
    topOffer {
      pricePerItem {
        native {
          unit
          __typename
        }
        ...TokenPrice
        __typename
      }
      maker {
        address
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment CollectionItemsTableRowFragment on Item {
  id
  name
  totalSupply
  isFungible
  ...ItemAvatar
  owner {
    ...profileUrl
    ...AccountLockup
    ...ProfilePreviewTooltip
    __typename
  }
  bestListing {
    startTime
    pricePerItem {
      ...TokenPrice
      __typename
    }
    __typename
  }
  ...bestItemOffer
  rarity {
    rank
    category
    __typename
  }
  lastSale {
    ...TokenPrice
    __typename
  }
  enforcement {
    isCompromised
    __typename
  }
  ...ItemLink
  ...BuyItemTableButton
  ...EnforcementBadge
  ...RarityTooltip
  ...isItemRarityDisabled
  ...ItemPreviewTooltip
  ...BulkActionsDisabledTooltip
  ...ItemOwnedQuantity
  __typename
}
fragment BuyItemTableButton on Item {
  bestListing {
    pricePerItem {
      ...TokenPrice
      __typename
    }
    marketplace {
      identifier
      __typename
    }
    maker {
      address
      __typename
    }
    __typename
  }
  ...useBuyItems
  __typename
}
fragment ItemAvatar on Item {
  imageUrl
  tokenId
  backgroundColor
  collection {
    imageUrl
    __typename
  }
  __typename
}
fragment ItemPreviewTooltip on ItemIdentifier {
  ...ItemPreviewTooltipContent
  __typename
}
fragment ItemPreviewTooltipContent on ItemIdentifier {
  ...itemIdentifier
  __typename
}
fragment BulkActionsDisabledTooltip on Item {
  collection {
    slug
    __typename
  }
  __typename
}
fragment collectionItemsPurchaseSelection on Item {
  id
  imageUrl
  bestListing {
    pricePerItem {
      token {
        unit
        symbol
        ...currencyIdentifier
        __typename
      }
      usd
      __typename
    }
    __typename
  }
  collection {
    slug
    __typename
  }
  isFungible
  ...useBuyItems
  ...isItemListed
  ...isItemTradable
  ...isOwnItemListing
  __typename
}
fragment isOwnItemListing on Item {
  owner {
    address
    __typename
  }
  ...isItemListed
  __typename
}
fragment collectionItemsSellSelection on Item {
  id
  imageUrl
  bestOffer {
    pricePerItem {
      token {
        unit
        symbol
        ...currencyIdentifier
        __typename
      }
      __typename
    }
    __typename
  }
  collection {
    slug
    __typename
  }
  ...useAcceptOffers
  ...useListItems
  ...isItemTradable
  __typename
}
`

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: string } }
) {
  const { platform } = params;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '12');

  try {
    // Convert platform string to enum value
    // const platformEnum = platform.toLowerCase() as keyof typeof Platforms;

    // Validate platform
    // if (!Object.keys(Platforms).includes(platformEnum)) {
    //   return NextResponse.json(
    //     { error: 'Invalid platform' },
    //     { status: 400 }
    //   );
    // }

    const response = await fetch('https://gql.opensea.io/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed',
        "Origin": "https://opensea.io",
        "Referer": "https://opensea.io"
      },
      body: JSON.stringify({
        operationName: "CollectionItemsListQuery", query, variables: {
          "collectionSlug": "woofy-avalanche",
          "cursor": "W251bGwsIjAwYWFjNWExOWIwYzMxZTc4NDdmOTA3ZGIzYmY3NWRmIl0=",
          "limit": limit,
          "sort": {
            "by": "PRICE",
            "direction": "ASC"
          }
        }
      })
    });
    const data = await response.json();

    if (!data.data?.collectionItems) {
      throw new Error('No collection items found');
    }

    const { items, nextPageCursor } = data.data.collectionItems;

    // Extract URLs from items
    const urls = items
      // @ts-expect-error ignore
      .filter(item => item.imageUrl)
      // @ts-expect-error ignore
      .map(item => item.imageUrl);

    const total = urls.length; // Note: In a real implementation, you'd need the total count from the API
    const totalPages = Math.ceil(total / limit);


    return NextResponse.json({
      urls,
      nextPageCursor,
      page,
      totalPages,
      total
    }, {
      headers: {
        'Cache-Control': 'no-store',
        'X-Ratelimit-Remaining': data.extensions?.debugInfo?.additionalInformation?.['x-ratelimit-remaining']?.toString() || 'unknown'
      }
    });
  } catch (error) {
    console.error(`Error fetching ${platform} NFTs:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch NFTs' },
      { status: 500 }
    );
  }
}
