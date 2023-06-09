// 時間を取得する
const setDate = () => {
    // moment.js 日本語化
    moment.lang('ja', {
        weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
        weekdaysShort: ["日","月","火","水","木","金","土"],
    });
    
    const _date = document.getElementById('_date');
    const _time = document.getElementById('_time');
    
    // const _logo1_id = document.getElementById('_logo1_id');

    // 時間取得 moment.js
    let date = moment();

    // 時間表示部分の書き換え
    _date.innerHTML = "<p class='date'>" + date.format('Y年MM月DD日(ddd)') + "</p>";
    _time.innerHTML = "<p class='time'>" + date.format('HH:mm:ss') + "</p>";
}
// 1秒おきに setDate を実行
window.onload = function(){
    setInterval(setDate, 1000);
}

const push = () => {
    Push.create("更新情報", 
        {
            body: "ブログの更新をお知らせします!",
            timeout: 8000,
            onClick: function () {
                window.focus(); 
                this.close();
        }
    })
}

// 環境光センサ Ambient Light Sensor(Generic Sensor API)
// パーミッションを調べる
navigator.permissions.query({name: 'ambient-light-sensor'})
.then((result) => {
    if(result.state === 'granted'){
        console.log('AmbientLightSensorは利用可能です。');
    }else if(result.state === 'denied'){
        console.log('AmbientLightSensorは利用不可能です。');
    }else if (result.state === 'prompt') {
        console.log('AmbientLightSensorの利用には許可が必要です。');
    }

    // センサオブジェクトをnewする
    const sensor = new AmbientLightSensor();

    // 有効になった時の動作
    sensor.addEventListener('activate', (event) => {
        console.log('AmbientLightSensorは有効になりました。');
    });

    // 値が変わった時の動作
    sensor.addEventListener('reading', (event) => {
        const _body = document.getElementById('_body');
        const _chara3 = document.getElementById('_chara3');
        
        const contentId = document.getElementById('_hide');
        const dtId = document.getElementById('_dateTime');
        
        const _logo1_id = document.getElementById('_logo1_id');
        const _logo2_id = document.getElementById('_logo2_id');

        // 100ルクス未満なら
        if(sensor.illuminance < 100){
            push();
            if(_body.className = 'bodyHide'){
                _body.classList.remove('bodyHide');
            }
            _chara3.classList.add('hide');
            if(contentId.className == 'hide'){
                contentId.classList.remove('hide');
            }
            _logo1_id.classList.add('hide');
            if(_logo2_id.className = 'hide'){
                _logo2_id.classList.remove('hide');
            }
            dtId.classList.add('dtHide');
        }else if(sensor.illuminance >= 100){
            _body.classList.add('bodyHide');
            if(_chara3.className = 'hide'){
                _chara3.classList.remove('hide');
            }
            contentId.classList.add('hide');
            if(_logo1_id.className = 'hide'){
                _logo1_id.classList.remove('hide');
            }
            _logo2_id.classList.add('hide');
            if(dtId.className == 'dtHide'){
                dtId.classList.remove('dtHide');
            }
        }
    });

    // エラーの時の動作
    sensor.addEventListener('error', (event) => {
        document.write(event.error);
        console.log("surfaceとmacしか動かん");
    });

    // 読み取り開始
    sensor.start();
});