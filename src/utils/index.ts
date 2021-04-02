import { alertController } from "@ionic/vue";

export function isEmptyObject(param:{}) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

export function toInt(data:any, defaultValue:any) {
  if ( data == null ) {
    return defaultValue;
  }

  return parseInt(data)
}

export function toIntOrUnd(data:any) {
  return toInt(data, undefined);
}

export function toIntOrNull(data:any) {
  return toInt(data, null);
}

export function toStringOrNull(data:any) {
  if ( data == null ) {
    return null;
  }

  if ( data == "null" ) {
    return null;
  }

  return data;
}

export function getEmailCertKey(length:number){
  let index = 0;
  const arr = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

  let sb = '';
  
  for ( let i = 0 ; i < length ; i++ ){
    index = Math.floor(arr.length * Math.random());
    sb = sb + arr[index];
  }

  return sb;
}

export async function showAlert(title:string,msg:string, method:any|null) {
  const alert = await alertController
  .create({
    header: title,
    message: msg,
    buttons:[  
    {
      text: 'Okay',
      handler: () => {
        method();
    }
  }
  ]
  });
return alert.present();
}