import forge from 'node-forge'
import storage from '../storage';
import { md5_Str, skey } from 'src/assets/static';
import { post } from '../request';

export function fetchSkey() {
  return new Promise<{ data: string }>((resolve) => {
    const ts = new Date().getTime()
    let md5 = forge.md.md5.create();
    md5.update(`${ts}${md5_Str}`);
    const sign = md5.digest().toHex();
    const obj = {
      ts,
      sign: sign
    }
    post('/get_access.php', obj).then(res => {
      storage.save({ key: skey, data: res.skey })
      resolve({ data: res.skey })
    })
  });
}
