import React from 'react';

type TypeDependency = any[];
type TypeDependencyNames = string;

let what_debug_changed = 0;
/**
 * Taken random color logic from some stackoverflow answer
 */
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 *
 * Check whether the dependency item is an object. then
 */
const isObject = (t: any) => {
  return Object.prototype.toString.call(t) === '[object Object]';
};

function getPrintableInfo(dependencyItem: any) {
  /**
   * Printing the info into viewable format
   */
  if (isObject(dependencyItem) || Array.isArray(dependencyItem)) {
    let ans;
    try {
      ans = JSON.stringify(dependencyItem, null, 2);
    } catch (e) {
      ans = 'CIRCULAR JSON';
    }
    return ans;
  }

  return dependencyItem;
}

const isDevelopment = process.env['NODE_ENV'] === 'development';

function useWhatChanged(
  dependency?: TypeDependency,
  dependencyNames?: TypeDependencyNames,
  suffix?: string
) {
  // const logRef =
  // This ref is responsible for book keeping of the old value
  const dependencyRef = React.useRef(dependency);

  // For count bookkeeping , for easy debugging
  const whatChangedHookCountRef = React.useRef(1);

  // For assigning color for easy debugging
  const backgroundColorRef = React.useRef('');

  let isDependencyArr = Array.isArray(dependencyRef.current);

  React.useEffect(() => {
    // const MyWindow: IWindow = window;
    if (
      dependencyRef.current &&
      isDependencyArr &&
      dependencyRef.current.length > 0
    ) {
      what_debug_changed++;

      whatChangedHookCountRef.current = what_debug_changed;
      backgroundColorRef.current = getRandomColor();
    }
  }, [dependencyRef, isDependencyArr]);

  function logBanners({ isFirstMount }: { isFirstMount?: boolean }) {
    if (isDevelopment) {
      console.log(
        `%c ${whatChangedHookCountRef.current} ${suffix || ''}`,
        `background: ${backgroundColorRef.current}; color: white; font-size: 10px`,
        '🧐👇',
        `${isFirstMount ? 'FIRST RUN' : 'UPDATES'}`
      );
    }
  }

  const longBannersRef = React.useRef(logBanners);

  React.useEffect(() => {
    longBannersRef.current = logBanners;
  });

  React.useEffect(() => {
    if (!(dependencyRef.current && isDependencyArr)) {
      return;
    }

    if (dependencyRef.current.length === 0) {
      return;
    }

    // More info, if needed by user
    const stringSplitted = dependencyNames ? dependencyNames.split(',') : null;
    let changed = false;
    const whatChanged = dependency
      ? dependency.reduce((acc, dep, index) => {
          if (dependencyRef.current && (dep !== dependencyRef.current[index])) {
            const oldValue = dependencyRef.current[index];
            dependencyRef.current[index] = dep;
            if (dependencyNames && stringSplitted) {
              changed = true;
              acc[`"✅" ${stringSplitted[index]}`] = {
                'Old Value': getPrintableInfo(oldValue),
                'New Value': getPrintableInfo(dep),
              };
            } else {
              acc[`"✅" ${index}`] = {
                'Old Value': getPrintableInfo(oldValue),
                'New Value': getPrintableInfo(dep),
              };
            }

            return acc;
          }
          if (dependencyNames && stringSplitted) {
            acc[`"⏺" ${stringSplitted[index]}`] = {
              'Old Value': getPrintableInfo(dep),
              'New Value': getPrintableInfo(dep),
            };
          } else {
            acc[`"⏺" ${index}`] = {
              'Old Value': getPrintableInfo(dep),
              'New Value': getPrintableInfo(dep),
            };
          }

          return acc;
        }, {})
      : {};
    if (isDevelopment) {
      longBannersRef.current({ isFirstMount: !changed });
      console.table(whatChanged);
    }
  }, [
    ...(() => {
      if (dependency && isDependencyArr) {
        return dependency;
      }
      return [];
    })(),
    dependencyRef,
    longBannersRef,
  ]);
}

export { useWhatChanged };
