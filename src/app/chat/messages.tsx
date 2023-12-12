import React from 'react';

const ChatMessages = () => {
  return (
    <div className="w-full px-5 flex flex-col justify-between">
      <div className="flex flex-col mt-5">
        {/* First message */}
        <div className="flex justify-end mb-4">
          <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
          我是顧炎武，"廉恥"沒有被刪
          我被教育部關在小黑房裡面寫作
          如果你能匯2萬塊錢到我的戶頭
          我會教你守住國之四維的技巧
          下一篇"禮義"發布的時候也會讓你出現在序文中
          </div>
          <img
            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
            className="object-cover h-8 w-8 rounded-full"
            alt=""
          />
        </div>

        {/* Second message */}
        <div className="flex justify-start mb-4">
          <img
            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
            className="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
          現代人戀愛流程：
          認識了一個人➔
          跟他一直聊天➔
          喜歡上他➔
          交往➔
          他跟你分手了卻跟你當朋友又一直讓你覺得有機會➔
          你依舊卡慘死➔
          因為想挽回他一直情勒或自我感動導致他受不了你封鎖你➔
          自暴自棄➔
          由愛生恨➔
          祝他家裡失火
          </div>
        </div>

        {/* Third message */}
        <div className="flex justify-end mb-4">
          <div>
            <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
            閨蜜說她男友好像外面有人 
            問她怎麼發現的
            她說看到男友帶女生去摩鐵
            感覺男友好像被吹了
            但又怕是自己誤會
            我直接跟她說很明顯是背叛了
            </div>
            <div className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
            男友被吹了👉男友背叛了
            被吹👉betray (V.) 背叛
            英文小教室，我們下次見
            </div>
          </div>
          <img
            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
            className="object-cover h-8 w-8 rounded-full"
            alt=""
          />
        </div>

        {/* Fourth message */}
        <div className="flex justify-start mb-4">
          <img
            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
            className="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
            這只是個寫死的模板 因為我忘記怎麼 map 出訊息了
          </div>
        </div>
      </div>

      {/* Input for new message */}
      <div className="py-5">
        <input
          className="w-full bg-gray-200 py-5 px-3 rounded-xl"
          type="text"
          placeholder="Type your message here..."
        />
      </div>
    </div>
  );
};

export default ChatMessages;
