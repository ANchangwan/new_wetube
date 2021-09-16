# new Wetube

Global(모든 영역에서 표시)

/ -> home</br>
/join -> Join</br>
/login -> Login</br>
/search -> Search</br>

/users/:id -> See User</br>
/users/logout -> Log Out</br>
/users/edit -> Edit MY Profile</br>
/user/remove -> Delete my profile</br>

/videos/:id -> See Video</br>
/videos/:id/edit -> Edit Video</br>
/videos/:id/delet -> Delete Videos</br>
/videos/upload -> Upload Video</br>

next는 다음 함수를 호출한다.

## middlewera

클라이언트가 접속하기전에 그 사이를 의미한다

middelware도 req res next argument를 받는다.
클라언트 - middelwere - app서버

모든 컨트롤이 middleware가 될 수 있다.
next함수를 통해서

## app.use

global middleware를 만들 수 있게 만든다.
어느 url이든 적용시켜준다.

순서가 제일 중요하다.

use -> get

req.method url이 어디로 향하는지 알 수 있다.

## package.json

nodejs 관련 정보를 담는 방법

dependencies만 있으면 npm i만 하면 node_module이 없어도 자동으로 설치가 된다.

## devdependencies 두개의 차이는

! dependencies 프로젝트가 작동하기 위해 필요한 것들
! devdependencies는 개발자가 개발할 때 필요한 것들

저장은 node_module에 저장된다.

## babel-node

최신 버전으로 바꿔서 자바스크립트를 노드에서 동작해도록 해준다.

## nodemon

nodemon은 파일 변할 때마다 재실행시켜준다

## server

클라이언트 -> 브라우저(request) ->middleware ->웹서버

const app =express() // express application 호출

서버는 내 컴퓨터 전체를 listening 할 수 없다.
그래서 port가 필요하다.
port는 나의 컴퓨터로의 창문이나 문이다.

브라우저가 웹서버에 가는게 아니라 요청해서 받아오는 것이다

app.get(routers, handler(함수))

아무응답이 없으면 계속 로딩한다.

handler에는 req, res 요청을 받고 응답을 뭘로 보낼지 결정할 수 있다.

## morgan

nodejs용 request logger middleware
morgan은 get, path, status code 모든 정보를 가지고 있다
##r ounter(라우터)
라우터는 내가 작업중인 주제를 기반으로 url을 그룹화해준다.
라우터는 url을 그룹화하는 방법이다.
라우터 안에 또다른 라우터를 만들 수 있다.
사용법

const 변수 = express.Router();

변수.get("url", 함수) 식으로 /첫 페이지/연결된 url 에 뭘 보여줄지 선언한다.

app.use("url", 변수) 이페이지 첫페이지를 보여준다. ##`export default`
코드를 정리하기 위해 외부 모듈을 내보내기 위해서 사용한다.

export default 변수를 선언하면 외부에서

import 변수 from 파일 위치
로 외부 파일 가져와 쓸 수 있다

이런식으로 코드를 작성하면 코드가 깔끔해 진다.

export default는 한파일에 하나만 가질 수 밖에 없다.
그래서 변수를 다른걸로 해도 알아 먹는다 받아올때

## export

app.use("시작 url", 라우터변수) ->여기가 시작 url을 의미

export 한 파일에서 여러개를 내보낼 수 있다.

export default와 다르게 다른 이름으로 설정해도 한파일에 하나만 설정해야 되기 때문에 다른 이름으로 해도 되지만
export는 여러개를 보낼 수 있어서 이름을 제대로 설정해야 한다. 받아올때

## url parameters

/:id는 굳지 id로 만들 필요없다. 다른 이름을 설정해도 상관없다. 이건 파라미터이다,
url에 변수를 사용할 수 있는 방법이다.
선언방법 -> ":변수"

사용시 주의사항 express 라우터 다음에 :변수자리가 있으면 그 자리를 변수로 인식하기 때문에 순서가 중요하다
그래서 :변수 선언은 맨 밑에 두는게 좋다.

정규표현식을 익혀서 정수만 받기

## pug

pug는 템플릿 엔진이다. 템플릿 엔진으 뷰를 만드는걸 돕는다.

뷰엔진이라서 설정 해줘야됨 -> app.set("view engine", "pug") pug 사용가능
html리턴하기 위해 pug 사용

1단계 pug install
2단게 pug set view engine
3 단계 pug 파일 생성

파일을 실행하면 fail이 뜬다. 에러를 잘 살펴보면 파일 경로가 잘못 됬다.
src/views를 찾아야되는데 경로는 new_wetube가 끝이다.
왜그럴까?
그건 package.json이 설정한 파일 경로로 파일을 실행하기 때문이다
package.json은 server.js가 있는 new_wetube만 설정되어 있기 때문이다.

이문제를 해결하는 방법은 src소스폴더 밖에 이동 시키거나 경로를 설정해준다,

방법 app.set("views", process.cwd() + "/src/views");

view 템플릿에 자바스크립트코드를 넣을 수 있음 방법 -> #{자바스크립트 코드}

파일 만들 때 주의 사항
첫째, 파일명은 띄어쓰기를 하지 않는다
둘째, 전부 소문자로 해야 한다.

## partials 활용

반복되는 html 파일이 있을것이다. 매번 pug파일 만들 때마다 추가해줘야 한다.
그럴 대 문제점은 반복되는 값을 하나 바꾸면 모든 파일 을 일일이 찾아서
수정해줘야 한다. 이런문제를 해결하기 위해 partials include가 있다

## inheriance(상속) on pug

block 변수 -> block 변수 는 창문이다 이어진다. 상속받아 그위치에
내가 원하는 값을 넣을 수 있다. 연결시켜서

## pug 변수 보내기

res.render("view 이름", 템플릿에 보낼 변수)ㅣ
원하는 만큼 변수 선언 가능

변수 선언 #{}

## MVP.css

역활

html 태그에 몇가지 기본 스타일들을 입혀준다.

## conditionals>

pug는 조건부를 사용할 수 있다.

## iteration

each 변수 in 배열

## mixin

데이터를 받을 수 있는 partial
반복되는 html이 필요한데 서로 다른 데이터를 가져야 할 때 필요하다

함수를 작성하는거와 같다고 생각하면 된다.
mixins폴더를 만들고 거기 안에 mixins함수를 작성한다.
mixins(argument) 식으로 만들고 데이터를 어떻게 처리할지 작성한다.

## 보여줄 페이지

include 폴더/파일

~~ +함수(argument) 이런식으로 선언한다.

## database

req.params는 url 변수이다.
데이터를 주고 받을 때는 req형태로 전송하고 받는다. res를 보내면 req에 데이터를 보낸다.

퍼그는 조건문을 인라인으로 사용 가능
#{video.views} #{video.views === 1? "view" : "views"}

relative url은 /지우고 그냥 경로 (ex:edit)를 설정하면 relative url이 된다.

absolute경로를 지정하면 "/edit" 이렇게 지정하면 root + /edit 가 된다.

action이라는 속성을 데이터를 어디로 보낼지 정한다. 전송할 url로 이동

get request와 post request의 차이점

get 방식 form - 구글이나 네이버에서 뭔가를 검색할때 주소창에 포함되어 있음
post - 파일을 보내거나 database에 있는 값을 바꾸는 뭔가르 보낼 때 사용, 로그인 등등

videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
하나의 url에 get을 할지 post를 할지 만들 때 한줄로 작성이 가능하다.

express는 form에 post 된 value를 이해 못한다.
미들웨어를 통해서 알려줘야한다.

## app.use(express.urlencoded({extended: true}));

한줄에 작성하면 form에서 전송된 데이터를 express가 이해할 수 있게 된다.
req.body로 받을 수 있다.

## mongo

데이터 베이스 연결하기 위해 mongoose를 설치한다
mongoose란 mongodb를 자바스크립트 작업하기 위해 필요한 도구이다.
npm i mongoose 입력

import Mongoose from "mongoose";

Mongoose.connect("mongodb://127.0.0.1:27017/wetube",)

mongod로 입력을 하면 설치가 잘 됬는지 알 수 있다.

mongo를 입력해서 mongo url를 알아낸 뒤 복사한

연결할 mongo 위치를 지정한다. 위치와 저장할 파일 이름을 입력해주면 끝

파일 자체를 가져오고 싶은면 js 파일만 import "./db" 이런식으로 작성한다.

## models>

mongo database에 model를 만들려면 mongoose를 임폴트해야한다.
model형태를 정의 해줘야 한다. 그것을 schema라고한다.

schema에 데이터형식을 지정해줘야한다. schema는 우리 비디오의 형태를 정의해준다.
}

const videoSchema = new mongoose.Schema({
title: String,
description: String,
creationAt: Date,
hashtags: [{type:String}]
})

(or)

const videoSchema = new mongoose.Schema({
title: {type:String],
description: {type: String},
creationAt: Date,
hashtags: [{type:String}]
})

에러 처리는 try catch로 해결

자바스크립트는 데이터 베이스와 실행속도가 달라서 비동기적으로 실행된다. 그래서 이러한 문제를 해결해주기 위해서 promise가 등장했다.

실행속도가 서로 다른 코드를 읽을 때 어떠한 실행이 끝날 때까지 기다리도록 강제할 수 있다.

최신 문법

## awit async

await async는 function 안에서만 사용이 가능하다

## return render

1. return의 역할 : 본질적인 return의 역할보다는 function을 마무리짓는 역할로 사용되고 있음.

- 이러한 경우 return이 없어도 정상적으로 동작하지만 실수를 방지하기 위해 return을 사용

2. render한 것은 다시 render할 수 없음

- redirect(), sendStatus(), end() 등등 포함 (express에서 오류 발생)

## data베이스에 저장하기><br><br>

post받을 함수에 model 객체와 똑같이 만든다. req.body에서 받을 데이터를 작성한 postUpload함수에 지정한다.

mongoose는 올바른 데이터가 아니면 인식을 하지 않음

schema를 설정할 때는 필수 값이라는 설정을 할 수 있다. 만약에 설정하지 않으면 없어도 그냥 저장된다. 단, 저장된 값에 없을 뿐이다.

설정하는 방법
creatAt: {type:(datatype), required:true}

설정하고 값이 없으면 에러가 발생 -> validationError

schema는 다양한 값을 설정할 수 잇다.
const video = await Video.findById(id).exeu(); -> query 실행

null 검색시 대처

에러체크를 먼저한다.

word.startsWith("")

findoneupdate

## mongoose middleware>

mongoose middlewares는 무조건 model이 생성되기 전에 만들어야 한다.
function 안에는 this라는 키워드 있는데 this는 우리가 저장하고자 하는 문서를 가리킨다.

내가 string으로 입력해도 mongoose는 자동으로 array로 변환시킨다.

1. findByIdAndUpdate()에서는 save 훅업이 발생하지 않음 => 다른 방법을 알아보자
2. Video.js에 function을 만들어서 관리하기 => 이것도 괜찮음 근데 다른것도 알아보자
3. static을 사용하면 import 없이도 Model.function()형태로 사용이 가능함

## delete and remove>

## search>

get으로 받는 name은 req.query로 받을 수 있다.
req.query is for the URL data.
req.query로 url에 있는 모든 정보들을 확인할 수 있다.

if 문 안에서 const는 {}안에서만 작동한다.
let으로 바꿔줘야한다.

검색 조건 필터는 mongodb에서 찾기
regex는 mongodb에서 정규표현식을 쓸 수 있게 한다.

# ✅USER AUTHENTICATION

user schema 작성

조건에 unique 삽입, 계정은 하나의 값만 있어야되고 중복되면 안되기 때문에 unique:true
로그인 폼을 만들 때 input name을 적어야 된다. 그래야 req.body로 받아서 활용할 수 있기 때문이다.

DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. -> Schema에 unique:true 했기 때문이다.

해결방법 -> db.js에 useCreateIndex:true 추가하기

## password hash

DB에 password를 그대로 입력해서는 안된다. 해시화해서 저장해야한다.
해싱은 일방향 함수
bcrypt를 사용해서 암호화하기<br>

install<br>

<pre>
npm i bcrypt
</pre>

userSchema.pre("save", async function(){
this.password = await bcrypt.hash(this.password, 해싱횟수)
});
this는 create되는 값을 의미한다.
await/async를 쓰고 있기 때문 콜백은 사용하지 않아도 됨

## form validation> 중복된 값이 있는지 확인하기

$ or operator 하나라도 같은 값이 존재하면 true값을 리턴

## status code

계정 생성할 때 성공한건지 아닌지 알려줄 필요가 있다.
status code가 브라우저에게 성공인지 아닌지 알려준다.

브라우저에게 알맞은 status code를 알려주는건 중요하다.
브라우저는 방문하면 히스토리를 남기는데 status code를 통해서 남길지 안 남길지를 정할 수 있다.
200은 히스토리를 남긴다.
404은 남기지 않는다

## login

mongoose exists를 이용해서 해당 value가 존재하는지 확인가능

해싱된 password를 어떻게해서 확인할까?
bcrypt.compare를 이용하면 가능 내가 입력한 password와 DB에 저장된 해시값을 비교해서 해시된 값을 비교할 수 있음
bcrypt.compare(password, user.password) 비동기 함수

booleand을 반환한다.

## session

### 세션이란

백엔드와 브라우저 간에 어떤 활동을 했는지 기억하는걸 말한다.

<pre>
브라우저 - (세션) - 백엔드
</pre>

사이트에 모든 사람들이 로그인을 하지 않더라도 기억하게 된다.
사이트에 들어온 사람들은 모두 다른 텍스트를 전달해준다. 그 텍스트를 이용해서 유저를 구분한다.

### expres-session

express-session을 통해서 세션을 구현한다.

브라우저는 우리에게 쿠키를 준다. 브라우저가 백엔드로 쿠키를 보내준다.

세션은 서버측에서 제공해주는 데이터, 쿠키는 클라이언트측에서 저장하고 사용하는 데이터
req.sessiontStore() 사용했을때 한번은 undefined가 나온 이유가 세션은 서버에서 만들어줘야 하는데 클라이언트가 첫 요청때 세션을 가지고있을리
없으니 undefined이 나온거고 그 이후 요청부턴 첫번째 요청때 세션을 만들어서 넘겨줬으니 클라이언트가 해당 값을 쿠키에 저장하고
매 요청때마다 서버에게 전달 세션은 서버가 만들어서 제공해주다보니 서버가 재부팅되면 초기화 된다. (그래서 DB에 저장해서 관리를 한다는 소리. 실 운영에선 서버가 꺼지는 일은 없으니깐.)
세션의 값은 서버가 만들어주는 고유값이다보니 해당 값을 기준으로 클라이언트에서 요청한 건에 대해 유저를 특정지을 수 있다

<strong>각 유저마 서로 다른 req.session object를 가지고 있다.</strong>

locals object는 전역으로 사용된다.

session에 로그인 정보를 넣을려면 object 형태로 추가해주면된다.

const user = await User.findOne({username});
req.session.user = user;

## response-object - locals(전역변수)

response-object에서 locals이란 object가 있다. 이 Object는 비어있다.
pug template에서 locals에 접근 할 수 있다.
locals을 모든 템플릿에 존재한다. middleware를 router에 적용 했을 때 한해서 가능하다.
locals를 통해서 template에 변수를 전역적으로 보낼 수 있다.

### 사용방법

res.locals.변수 = "";

pug에서 사용할 때는 locals 빼고 변수 명으로 사용할 수 있다.

## session 정리

유저가 브라우저에 접속하면 백엔드는 유저에게 sessionID를 준다. 유저는 쿠키라는 이름으로 sessionID를 받는다.
브라우저는 쿠키가 저장된다.

## mongo Store

백엔드에 저장된 세션은 일시적이다. 서버를 껐다가 다시켜면 지워진다. 이러한 문제를 해결하는 게 mongo Store이다.
설정
store: MongoStore.create({mongoUrl:""})
app.use("session()")에 추가한다.

쿠키는 사용자에게 주고, session은 db에 준다.

인증되지 않은 사용자에게 쿠키를 안줄려면 두 값을 false로 설정한다.
resave:false,
saveUninitialized:false,

cookie:{
masAge: 20000,
} =>쿠키 만료시간 설정 가능

## process.env

노출하고 싶지 않은 url이나 api를 숨기는 방법 process.env파일 만들기
만든파일 git에 추가

## ✅ User Profile

user profile를 접속할려면 로그인 상태에서만 접속할 수 있어야 한다.
세션을 이용하면 간단하게 해결 가능하다.

세션을 만들 때 유저가 로그인한다면 값을 true를 추가해준다.
ex) req.session.loggedin = true

이런식으로 해주고 middleware 모듈에 로그인했는지 안했는지 판별식에 함수를 만들어서 확인한다.

### all()

get,post 등 어떤 http method를 사용하든지 이 middleware를 사용하겠다는 뜻

### login, userProfile 등등 로그인한 유저, 로그인 안된 유저에 대한 문제 해결

middleware 모듈에 session을 이용해서 수정

### Edit Profile
현재 로그인된 user의 id를 어떻게 얻을까?
requst object에 req.session.user가 있다.

req object 받아오기

const {
    session:{
        user:{id}
    } = req;
}

const edit_id = req.session.user.id;

DB 업데이트 할 때 -> findByIdAndUpdate(id로 찾을 때 사용)

### findByIdAndUpdate 할때 최신 데이터로 업데이트가 안되는 문제 해결 -> option, {new:true} 사용
const updatedUser = await User.findByIdAndUpdate(
        _id,{
            name,
            email,
            username,
            location
        },
        {new:true}
    );

### change password
비밀번호를 변경할 때는 session 또한 업데이트 해줘야 한다. db만 변경되고 session은 그대로인 경우가 있는데 
session과 db가 서로 달라서 제대로 동작하지 않는다.

### muter

파일을 업로드 할 수 있게 해주는 미들웨어

uploadFiles.single("avatar")은 template의 input에서 오는 avatar 파일을 가지고   파일을 업로드하고 
upload폴더에 저장

주의사항
절대 DB에 파일을 저장하지 않고 uploads 파일에 저장한다.

### 외부 폴더 사용하기
multer을 이용해서 파일을 업로드 하면 업로드 파일에 저장된다. 이걸 가져다가 쓸려면 에러가 발생한다.
브라우저가 어떤 페이지와 폴더를 볼 수 있는지 알려줘야 한다.
이러한 문제를 해결하기 위해서 static을 사용해서 내가 노출하고 싶은 폴더의 이름 쓰면 된다.

선언
app.use("/uploads", express.static())

### static 파일
static 파일이란 Express 한테 사람들이 이 폴더 안에 있는 파일들을 볼 수 있게 해달라고 요청

서버가 어떤 폴더를 공개할지 정한다.

### Video Upload
multer은 "req.file"fmf 제공해 준다. file 안에 path가 존재한다.
"multe"를 사용해서 파일을 업로드하고 싶다면 **"form"의 "encoding type"을 바꿔줘야한다.

### 두개의 서로 다른 schema 연결하기

owner:{
        type:mongoose.Schema.Types.ObjectId, 
        required:true,
        ref:"User",
    },

ref를 통해서 어떤 모델들을 참고할지 설정해준다.

### populate

owner에 참조한 User 데이터를 채워준다. 다른 모델 데이터들을 연결 시켜준다.

### bug fix

isModified는 수정이 일어났는지를 판별하는 함수



## ✅ Webpack

### webpack.config.js
webpack을 설정하기 위한 파일 생성

오래된 자바스크립트 코드만 이해할 수 있음

import from (x)

const xx = require("xx");

모든 파일들에는 entry가 필요하고, output이 필요하다

### mode
webpack에게 지금 개발 중인지 아닌지 알려준다. 만약 production 모드일 경우 코드를 압축시켜 준다.
그렇게 되면 개발 중에 발생한 오류를 수정할 때 파악하기 힘들다.
개발 중일 때는 development를 설정해줘야한다.

### Entry 

우리가 처리하고자 하는 파일들, 내가 작성한 코드들

### output
결과물을 위해서 파일명을 설정

### path
파일을 어디에 저장할 절대 경로 지정

#### __dirname
절대 경로란 말그대로 폴더에 절대적인 위치를 말한다. 현재폴더를 기준이 아니라 전체 경로를 말한다.
전체를 경로를 설정하기 위해서 __dirname을 사용하면 편하게 경로를 가져 올 수 있다.

#### path.resolve()

const path = require("path");
path.resolve는 내가 입력한 파트들을 모아서 경로로 만들어 준다.

### rules
각각의 파일 종류에 따라 어떤 전환을 할건지 결정한다.
rules는 array 타입이다

### loader
파일들을 변환하는 장치

loader사용하는 방법
1. 객체를 사용하는 방법
2. 여러가지 loader들을 가져다가 한 가지의 변형으로 만들 수 있다.

#### 사용법
module: {
    rules: [
        {
            test: /\
            use:{
                loader:
                options:
            }
        }
    ]
}

test라는 파일을 loader로 가공한다. webpack은 node_modules에서 babel-loader를 찾는다.
몇가지 옵션을 전달한다.

### sass-loader

<pre>
npm install sass-loader sass webpack --save-dev
</pre>

sass는 웹이 이해하지 못한다. 그래서 css로 변환하기 위한 loader를 설치해야 한다.

다른 loader들을 합쳐야 되는 상황은 역순으로 설정한다.