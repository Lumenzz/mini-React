import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";


function hasValidKey(config){
    return config.key !== undefined;
}

function hasValidRef(config){
    return config.ref !== undefined;
}


function ReactElement(
    type,
    key,
    ref,
    props,
  ) {
  
    const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    };
  
    return element;
  }

export function createElement  (type, config, children)  {

    let propName;
    const props = {};

    let key = null;
    let ref = null;

    if (config != null) {
        
        if (hasValidRef(config)) {
            ref = config.key;
        }
        if (hasValidKey(config)) {
            key = '' + config.key;
        }

        // 将除key和ref之外的值放入props中
        for (propName in config) {
            if (
                hasOwnProperty.call(config, propName) &&
                propName !== 'key' && propName !== 'ref' 
            ) {         
                props[propName] = config[propName];
            }
        }
    }

    const childrenLength = arguments.length - 2;

    // 将子节点添加到props的children属性中
    if (childrenLength === 1) {
        props.children = children;
    } else if (childrenLength > 1) {
        const childArray = Array(childrenLength);
        
        for (let i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
        }
            props.children = childArray;
    }

    // 处理defaultProps
    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps;
        for (propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }

    // 返回处理后的节点
    return ReactElement(
        type,
        key,
        ref,
        props,
    );
}


export function jsxDEV (type,config) {
  
      let key = null;
      let ref = null;

      const props = {};
  
      if (hasValidKey(config)) {
        key = '' + config.key;
      }
  
      if (hasValidRef(config)) {
        ref = config.ref;
      }

      for (const propName in config) {
        if (
            hasOwnProperty.call(config, propName) &&
            propName !== 'key' && propName !== 'ref' 
        ) {         
            props[propName] = config[propName];
        }
    }
  
      return ReactElement(
        type,
        key,
        ref,
        props,
      );
    
  }
