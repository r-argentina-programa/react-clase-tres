import React, { useState, useEffect, useReducer, createContext, useContext } from 'react';

//#region naive

export const useFetchOnChange = (fetchResource, param) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (param) {
        setLoading(true);
        setError(null);
        setData(null);
        try {
          const resource = await fetchResource(param);
          setData(resource);
        } catch (error) {
          setError(error);
        }
        setLoading(false);
      } else {
        setData(null);
        setError(null);
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [fetchResource, param]);

  return { data, error, loading };
};

//#endregion naive

//#region reducer

const initialState = { loading: false, data: null, error: null };

const fetchReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD':
      return { ...state, loading: true, data: null, error: null };
    case 'SUCCESS':
      return { ...state, loading: false, data: payload, error: null };
    case 'FAILURE':
      return { ...state, loading: false, data: null, error: payload };
    default:
      return state;
  }
};

export const useFetchReducer = (fetchResource, param) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      dispatch({ type: 'LOAD' });
      try {
        const resource = await fetchResource(param);
        dispatch({ type: 'SUCCESS', payload: resource });
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: error });
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [fetchResource, param]);

  return state;
};

//#endregion reducer

//#region cache

const CacheContext = createContext();
CacheContext.displayName = 'Cache';

const cacheReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CACHE':
      return {
        ...state,
        [payload.key]: payload.value,
      };
    default:
      return state;
  }
};

export function CacheProvider({ children }) {
  const [state, dispatch] = useReducer(cacheReducer, {});

  return <CacheContext.Provider value={{ state, dispatch }}>{children}</CacheContext.Provider>;
}

export function useFetchWithCache(fetchResource, param) {
  const cache = useContext(CacheContext);
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (cache.state[param]) {
      dispatch({ type: 'SUCCESS', payload: cache.state[param] });
      return;
    }

    const timeoutId = setTimeout(async () => {
      dispatch({ type: 'LOAD' });
      try {
        const resource = await fetchResource(param);
        dispatch({ type: 'SUCCESS', payload: resource });
        cache.dispatch({ type: 'SET_CACHE', payload: { key: param, value: resource } });
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: error });
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [param, cache, fetchResource]);

  return state;
}

export function useFetch(fetchResource, param) {
  const cache = useContext(CacheContext);
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (cache.state[param]) {
      dispatch({ type: 'SUCCESS', payload: cache.state[param] });
      return;
    }

    const fetch = async () => {
      dispatch({ type: 'LOAD' });
      try {
        const resource = await fetchResource(param);
        dispatch({ type: 'SUCCESS', payload: resource });
        cache.dispatch({ type: 'SET_CACHE', payload: { key: param, value: resource } });
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: error });
      }
    };
    fetch();
  }, [param, cache, fetchResource]);

  return state;
}

//#endregion cache

export default useFetchWithCache;
