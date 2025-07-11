import { ofType } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { searchSuccess } from './actions';

export const rootEpic = (action$) =>
  action$.pipe(
    ofType('SEARCH_PLACE'),
    switchMap((action) =>
      from(
        fetch(`http://localhost:5050/api/search?query=${encodeURIComponent(action.payload)}`)
          .then((res) => res.json())
          .then((data) => searchSuccess(data.results[0]))
      )
    )
  );
