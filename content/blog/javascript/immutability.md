---
title: Immutability
date: 2021-03-25 00:03:98
category: javascript
thumbnail: { thumbnailSrc }
draft: false
---

Immutability는 **불변(성), 불역성(不易性)(unchangeableness)**이라는 뜻을 갖고있는 단어인데요.\
Javascript에서는 **데이터의 원본이 훼손되지 않도록(불변하게) 개발하는 방법**을 의미합니다.

*"데이터의 원본이 훼손된다?"*가 무슨 말인지 감이 안잡히는데요..\
간단한 코드를 보면서 알아봅시다!

```js
var a = 'haha'
a = 'hoho'
```

라는 코드가 있을 때, ```var a = 'haha'```는 내부적으로 아래와 같이 동작할겁니다.

1. a 라는 변수를 선언
2. 'haha'라는 값의 저장을 위한 메모리공간을 할당, a라는 변수와 연결, undefined로 초기화
3. 'haha'라는 값을 할당

![변수의할당]('./images/immutability-var')

그러면 ```a = 'hoho'``` 코드는,

#### <span style="background-color: yellow;">*A. 'haha'가 저장되어 있는 메모리공간의 값을 수정(재할당) ?*</span>
![값을 변경]('./images/immutability-var-a')

#### <span style="background-color: yellow;">*B. 새로운 메모리 공간을 할당하여 'hoho'를 저장하고, a변수와 재연결 ?*</span>
![새로운 메모리를 할당]('./images/immutability-var-b')

둘 중 어떤 동작을 하게 될까요?

**A 처럼 기존의** 메모리영역의 **값을 수정할 수 있는 경우**를 **"Mutable 하다"**고 표현하며, 이는 처음 원본데이터를 훼손시킬 수 있다는 의미이기도 합니다.

반면에 B처럼 기존 값의 변경이 불가능하여 **매번 새로운 메모리공간을 확보하여 값을 할당하는 경우**를 "**Immutable 하다**" 고 합니다.

javascript에서 문자열은 immutable 한 데이터로 취급되기 때문에, ```a = 'hoho'```는 B로 동작하게 됩니다.\
<small>(자세한 내용은 아래에서 알아보겠습니다.)</small>

즉, Javascript 에서 Immutability를 한마디로 정리해보자면,

> 변수의 값을 변경할 때,\
> 기존의 값을 수정하지 않고 새로운 값으로 재할당하도록 개발하는 방식

이라고 말할 수 있을 것 같습니다.


## Immutable data

> 기존 메모리영역의 값의 수정이 불가능한 데이터

기존 값의 변경이 불가능하기때문에, **매번 메모리를 새로 할당받는 데이터**입니다.

대표적으로 원시타입(primitive type)의 데이터들은 Immutable data 입니다.\
위에서 예시로 들었던 ```a = 'hoho'``` 같은 문자열 데이터타입도 immutable하게 동작합니다.

- Boolean
- null
- undefined
- Number
- String
- Symbol

한가지 주의해야할 타입은 ***String*** 입니다.

문자열은 일반적으로 문자들의 배열형태로 저장하게 되는데요.\
C는 문자열의 인덱스에 접근하여 문자열안의 특정 문자를 수정할 수 있는반면, javascript에서의 문자열은 immutable 하기때문에 불가능합니다.

```js
var str = 'hello';

console.log(str[0], str[1]); // h, e

str[0] = 'h'; // 무시됨
str[1] = 'i'; // 무시됨

// 변함이 없다.
console.log(str[0], str[1]); // h, e
console.log(str); // hello
```


## Mutable data

> 기존 메모리영역의 값의 수정이 가능한 데이터

mutable 한 데이터로, **메모리영역에 있는 기존의 값을 변경할 수 있습니다.**

Javascript에서 Object타입의 데이터들은 모두 Mutable data 인데요.\
앞서 말한 원시타입을 제외한 모든 값들은 Object 타입입니다.

- Object
- Array
....

## Mutable vs Immutable

> 값이 메모리에 할당된 이후, 수정이 가능한가?

이제 mutable한게 뭔지, Immutable 한게 뭔지 알게되었습니다.\
이 차이를 코드상에서 어떻게 알 수 있는지 확인해보겠습니다.

```js
// Immutable data
var num = 42;
var str = 'hello';

// mutable data
var arr = [];
var obj = { name: 'chun', age: 30 };
```

위에처럼 변수안에 값들이 있고, 이 변수들을 다른변수에 복사해보겠습니다.

```js
var copiedNum = num;
var copiedStr = str;

var copiedArr = arr;
var copiedObj = obj;

console.log(copiedNum, copiedStr); // 42, "hello"
console.log(copiedArr, copiedObj); // [], { name: 'chun', age: 30 }
```

값이 잘 복사된것처럼 보이는데요,\
원본 변수의 값들을 수정했을 때 어떤차이가 있는지 확인해보겠습니다.

```js
// Immutable data
num = 99;
str = 'bye';

// mutable data
arr.push(1);
obj.name = 'ginameee'
obj.age = 29; // 젊어지고싶어요

console.log(copiedNum, copiedStr); // 42, "hello"
console.log(copiedArr, copiedObj); // [ 1 ], { name: 'ginameee', age: 29 }
```

차이가 느껴지시나요?

**Immutable한 데이터는** 복사할 때 새로운 메모리영역에 값이 저장되었기 때문에, 복사본과 원본이 각각의 데이터를 갖게되었습니다. 따라서 **원본데이터의 변경이 복사본에 영향을 미치지 않습니다**.

반면에 **Mutable한 데이터는** 복사본과 원본이 같은 메모리영역의 값을 참조하고있기 때문에, **원본의 데이터 값이 변경되면 복사본의 데이터도 변경**이됩니다.

## Immutability 패턴

위와 같은 사태를 방지하기위한, Mutable data를 Immutable 하게 개발하기 위해서는 어떤 방법들이 있을까요?

- Matable data를 **수정할 때, 메모리를 새로 할당**받는다. (Immutable data처럼 동작하게 만들기)
- Mutable data의 **수정을 막아버린다**.

정도의 방법을 통해서 Immutability를 적용할 수 있을 것 같은데요.\
각각의 방법을 어떤 방식으로 구현할 수 있을지 확인해보겠습니다.

### 새로운 메모리영역에 변경된 값을 할당하기

Mutable data를 변경 할 때, Immutable data처럼 동작하게 하는 방법입니다.\
**새로운 메모리에 변경된 값을 할당하고**, 변수에 재적용합니다.

ES6에서 제공하는 ```Object.assign```메소드나, ```Destructuring``` 문법을 이용하여 구현이 가능합니다. 

#### Object.assign

```Object.assign(target, ...sources)```은 ES6에 추가된 메소드로, ```sources``` 객체들의 프로퍼티들을 ```target``` 객체로 복사하는 기능을 합니다. 공통된 프로퍼티는 덮어씌워집니다.\
```target```에 빈객체를 넣어준다면, ```sources``` 객체(들)를 Immutable하게 복사하는것과 동일한 효과를 볼 수 있고, 이를 이용해서 Immutability 적용이 가능합니다.

```js
var arr = [1, 2, 3];
var copiedArr = arr;
var assignedArr = Object.assign([], arr);

arr.push(4);

console.log(arr); // [1, 2, 3, 4]
console.log(copiedArr); // [1, 2, 3, 4] 
console.log(assignedArr); // [1, 2, 3]
```

```js
var obj = {};
var copiedObj = obj;
var assignedObj = Object.assign({}, obj);

obj.name = 'chun';

console.log(obj); // {name: "chun"}
console.log(copiedObj); // {name: "chun"}
console.log(assignedObj); // {}
```

#### 비구조화 문법 (Destructuring)

구조화된 배열 또는 객체를 비구조화(분해)하여 개별적인 변수에 할당하는 ES6에서 제공하는 문법입니다.\
비구조화하는 과정에서, 비구조화된 데이터를 새로운메모리 영역에 할당하는데, 이를 이용해서 Immutability를 적용할 수 있습니다.

```js
var arr = [1, 2, 3];
var copiedArr = arr;
var destructuredArr = [...arr];

arr.push(4);

console.log(arr); // [1, 2, 3, 4]
console.log(copiedArr); // [1, 2, 3, 4] 
console.log(destructuredArr); // [1, 2, 3]
```

```js
var obj = {};
var copiedObj = obj;
var destructuredObj = { ...obj };

obj.name = 'chun';

console.log(obj); // {name: "chun"}
console.log(copiedObj); // {name: "chun"}
console.log(destructuredObj); // {}
```

### 수정을 막아버리기!

```Object.freeze```라는 메소드를 이용하여 값의 변경을 막아버림으로써 Immutable하게 만듭니다.

```js
var person = {
    name: {
        first: 'Jangchun',
        last: 'Lee'
    },
    age: 30,
};

Object.freeze(person);

person.age = 29; // ignored
person.name.last = 'Park'; // applied ?? 

console.log(person);
/*
{
    name: {
        first: "Jangchun",
        last: "Park"
    },
    age: 30
}
*/
```

이상한 점이 하나 있습니다.

```person.age``` 코드는 무시가 된 반면, ```person.name.last = 'Park';``` 적용이 되었습니다.\
```person```은 수정을 방지했지만, ```person.name```은 mutable data 이기때문에, 값의 변경이 가능해져버린겁니다. 따라서 내부객체까지 일일이 freeze 시켜놓아야합니다.

이러한 deep freeze 이슈는 앞서 소개한 모든 방법들에 공통적으로 발생하는 이슈입니다.\
다행히 이러한 작업들을 쉽게 해주는 라이브러리들이 있습니다!

## Immutable.js
위에서 말한 deep freeze와 같은 번거로움들을 쉽게 해주는 다양한 library들이 있는데요,\
현재 가장 인기가 많은 라이브러리인 ```Immutable.js``` 의 간단한 사용법에 대해 소개합니다.

### 설치
```shell
$ npm install immutable
```

### 사용
1. ```immutable.js```가 제공하는 데이터 구조<small>(Stack, List, Map, OrderedMap...)</small>객체를 생성합니다.
2. 조작합니다. 어떤 조작을 하든 Immutable 하게 수정됩니다.

```js
const { Map } = require('immutable');

const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 50);

map1.get('b') + " vs. " + map2.get('b'); // 2 vs. 50
```

```js
const { List } = require('immutable');

const list1 = List([ 1, 2 ]);
const list2 = list1.push(3, 4, 5);
const list3 = list2.unshift(0);
const list4 = list1.concat(list2, list3);

console.log(list1.size); // 2
console.log(list2.size); // 5
console.log(list3.size); // 6
console.log(list4.size); // 13
```


## 왜 중요할까?

javascript로 개발을 하다보면 옵저버패턴을 자주 사용합니다.\
SPA프레임워크인 ```React```, ```Vue``` 나 ```Angular```에서도 옵저버패턴을 이용하는데요,\
**옵저버패턴**은 옵저버가 특정 변수를 감시하다가 값이 변경되었을 때 동작을 수행하도록 하는 디자인패턴 입니다.

여기서 **데이터가 변경되는 시점**은 변수가 가르키는 **메모리의 주소가 변경되었을때**를 의미합니다.\
따라서 mutable한 데이터의 변경은 기존 메모리에 있는 데이터를 수정하기 때문에, 옵저버가 변경을 인식하지 못하게 되는 경우가 발생합니다.
따라서 Immutability를 이해하고 적용하는건 중요합니다.

## 참고문헌
- https://poiemaweb.com/js-immutability
- https://opentutorials.org/module/4075
- https://poiemaweb.com/js-data-type-variable
- https://blog.logrocket.com/immer-and-immutable-js-how-do-they-compare/
- https://dassur.ma/things/deep-copy/