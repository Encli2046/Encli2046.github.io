const ap = new APlayer({
    container: document.getElementById('aplayer'),
    autoplay: false,
    fixed: true,
    theme: '#FADFA3',
    mutex: false,
    lrcType: 0,
    audio: [
			     
		      {
		        name: "Cahaba",
		        artist: 'Southern',
		        url: 'http://fs.open.kugou.com/33ca8e634137a779191c5cf54f29f859/5ce102d9/G108/M05/1A/05/DIcBAFvb42-AJRXiAFU5p4yq5M4749.mp3',
		        cover: 'http://p2.music.126.net/XiakUZxbbUmY_V2q6ELAcw==/5850501371416747.jpg',
		      },
		      {
		        name: 'The Road',
		        artist: 'As the Stars Fall',
		        url: 'http://m10.music.126.net/20190519150953/19d26c626b0100504f5ccfbfcc500621/ymusic/545f/545a/540c/c5ad40b715c037a0f47ccff9cea79383.mp3',
		        cover: 'http://p1.music.126.net/dQXurpol9xZAMx-6ohesHw==/109951163101866703.jpg',
		      },
		      {
		        name: '落寞莉',
		        artist: '昆虫白',
		        url: 'http://m10.music.126.net/20190519150907/77c91f0f78427b913d35930a274fd981/ymusic/a95c/3cef/0bc4/5ea8bd5319ac4994b766d523a78e4228.mp3',
		        cover: 'http://p1.music.126.net/PShUddwRw99wyJEuQSCRpA==/46179488378843.jpg',
		      },
		      {
		        name: '海浪',
		        artist: 'Deca Joins',
		        url: 'http://m10.music.126.net/20190519150055/078b364c36d1ad618b78e0a48eb0bed5/ymusic/62f0/2a03/3686/e138a74a7ccfca8d4ec8f1c4e81a79c0.mp3',
		        cover: 'http://p1.music.126.net/DJfkuXG7P478Cb2ODUgmRg==/109951163608046759.jpg',
		      }
    ]
});
