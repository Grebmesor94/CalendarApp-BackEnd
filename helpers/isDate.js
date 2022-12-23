import moment from 'moment';


export const isDate = ( value ) => { 

  if( !value ) return false;

  const date = moment( value );

  return ( date.isValid() ) ? true : false;
  
}