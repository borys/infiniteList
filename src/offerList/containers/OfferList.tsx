import { OfferId } from 'core/models';
import { AppStore } from 'core/store';
import { fetchMoreOffers } from 'offerList/actions';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useThunkDispatch } from 'utils/useThunkDispatch';

import { MemoizedOfferListView } from '../components/OfferListView';

export const OfferList: React.FC = () => {
  const history = useHistory();
  const offers = useSelector((state: AppStore) => state.offerList.data);
  const hasMore = useSelector((state: AppStore) => state.offerList.hasMore);
  const thunkDispatch = useThunkDispatch();

  const showDetails = useCallback(
    (id: OfferId, scrollPosition: number) => {
      history.replace(history.location.pathname, {
        ...history.location.state,
        scrollPosition,
      });

      history.push(`/details/${id}`);
    },
    [history]
  );

  const loadMore = useCallback(() => {
    thunkDispatch(fetchMoreOffers());
  }, [thunkDispatch]);

  return (
    <MemoizedOfferListView
      offers={offers}
      onItemClick={showDetails}
      hasMore={hasMore}
      loadMore={loadMore}
      initScrollPosition={
        history.location.state && history.location.state.scrollPosition
      }
    />
  );
};
