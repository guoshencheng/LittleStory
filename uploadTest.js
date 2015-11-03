/**
 * Created by guoshencheng on 11/3/15.
 */
var qiniu = require('qiniu')
var fs = require('fs')
function uploadFile(localFile, key, uptoken) {
    var extra = new qiniu.io.PutExtra();
    //extra.params = params;
    //extra.mimeType = mimeType;
    //extra.crc32 = crc32;
    //extra.checkCrc = checkCrc;

    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
            // 上传成功， 处理返回值
            console.log(ret);
            // ret.key & ret.hash
        } else {
            // 上传失败， 处理返回代码
            //console.log(err);
            // http://developer.qiniu.com/docs/v6/api/reference/codes.html
        }
    });
}

uploadFile('startDb.sh', 'guoshencheng',
    'EyEwm6Bjadr4ojSFxpKWt6k-PoyT99D5l_qMCEaL:vQsd-pDd-Ew5JC-jhKYjDc0QNBQ=:eyJyZXR1cm5Cb2R5Ijoie1wibmFtZVwiOiQoZm5hbWUpLFwic2l6ZVwiOiQoZnNpemUpLFwid1wiOiQoaW1hZ2VJbmZvLndpZHRoKSxcImhcIjokKGltYWdlSW5mby5oZWlnaHQpLFwiaGFzaFwiOiQoZXRhZyl9Iiwic2NvcGUiOiJndW9zaGVuY2hlbmc6Z3Vvc2hlbmNoZW5nIiwiZGVhZGxpbmUiOjE0NDY1MjM4ODB9')