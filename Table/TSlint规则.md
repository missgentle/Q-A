## TypeScript-specific	TS特性	这些规则发现与TypeScript特性相关的错误	

规则名	功能	配置参数	举例	备注

- adjacent-overload-signatures	
  - 功能：强制函数重载为连续的。通过将自然相关的条目分组在一起，提高可读性和组织性	
  - 配置参数: 无	
  - 举例: "adjacent-overload-signatures": true	
  - 备注: TS
  
- ban-types	
  - 禁止使用特定类型。不禁止使用相应的运行时对象	
  - 列表	
  - "ban-types": [true, ["Object", "Use {} instead."], ["String"]]	
  - TS
  
- member-access	
  - 需要为类成员明确的可见性声明，提高代码可读性。缺少可见性声明的成员可能是类内部件意外泄漏的迹象
  - "no-public" 禁止指定公共可访问性，因为这是默认设置;"check-accessor" 对get/set方法强制显式可见性;"check-constructor" 对构造函数强制显式可见性;"check-parameter-property" 对参数属性强制显式可见性;"member-access": [true, "no-public"]
  - TS FIX
  
- member-ordering	"执行成员排序。
对类成员进行一致的排序可以使类更容易阅读、导航和编辑。
与成员排序相反的常见做法是将相关的类组放在一起。
"	"必须提供一个参数，它是一个对象。它应该包含一个order属性。order属性应该具有以下字符串之一的值
fields-first
instance-sandwich
statics-first
或者，order的值可能是由以下字符串组成的数组"	"""member-ordering"": [
  true,
  {
    ""order"": [
      ""public-static-field"",
      ""public-instance-field"",
      ""public-constructor"",
      ""private-static-field"",
      ""private-instance-field"",
      ""private-constructor"",
      ""public-instance-method"",
      ""protected-instance-method"",
      ""private-instance-method""
    ]
  }
]"	0

- no-any	不允许使用any类型作为类型声明建议使用<T>模板类型进行泛型类型处理。使用any作为类型声明会使类型系统的编译时优势无效	无	"no-any": true	TS
  
- no-empty-interface	禁止空接口。空接口相当于它的超类型(或{})	无		TS

- no-import-side-effect	避免带有副作用的导入语句。具有副作用的导入可能具有静态验证困难的行为。	"可以选择提供一个参数: 
ignore-module允许指定regex并忽略它匹配的模块。
"	"no-import-side-effect": [true, {"ignore-module": "(\\.html|\\.css)$"}]	0

- no-inferrable-types	对初始化为数字、字符串或布尔值的变量或参数不允许显式类型声明。在显式类型中，编译器可以很容易地推断它们，使代码更加冗长。	"可以选择提供两个参数:
ignore-params允许为函数解析指定可推断的类型注释。这在与typedef规则结合时很有用
ignore-properties允许为类属性指定可推断的类型注释
"	"no-inferrable-types": [true, "ignore-params", "ignore-properties"]	TS FIX

- no-internal-module不允许内部模块。使用模块会导致概念与外部模块的混淆。使用更新的名称空间关键字代替		无	"no-internal-module": true	TS FIX

- no-magic-numbers	不允许在变量赋值之外使用常量值。当没有指定允许值的列表时，默认情况下允许-1、0和1。不可思议的数字应该避免，因为它们经常缺少文档。强制将它们存储在变量中会给它们提供隐式文档。	数字列表	"no-magic-numbers": [true, 1, 2, 3]	0

- no-namespace	不允许使用内部模块和命名空间，仍然允许使用declare模块。es6风格的外部模块是模块化代码的标准方式。使用模块{}和命名空间{}是组织打字稿代码的过时方法	"可以选择提供一个参数: 
allow-declarations允许声明名称空间……{}描述外部api。"	"no-namespace": [true, "allow-declarations"]	TS

- no-non-null-assertion	不允许使用!后缀运算符。否则取消了严格的空检查模式的好处	无	"no-non-null-assertion": true	TS

- no-parameter-reassignment	不允许重新分配参数。	无	"no-parameter-reassignment": true	0

- no-reference	不允许已过时的/// <reference path=>导入，使用ES6代替 	无	"no-reference": true	0

- no-unnecessary-type-assertion	警告类型声明未改变表达式类型	忽略的白名单列表		TS FIX TYPE

- no-var-requires	除了在import语句中，不允许使用require语句。换句话说，禁止使用诸如var module = require(“module”)之类的表单。使用import foo = require('foo')或ES2015	无	"no-var-requires": true	TS

- only-arrow-functions	不允许传统(非箭头)函数表达式。传统函数不绑定词法范围，在访问this时可能导致意外行为。	"可以选择提供两个参数:
""allow-declarations""允许独立的函数声明。
""allow-named-functions"" 允许 function foo() {} 不允许 function() {}.
"	"only-arrow-functions": [true, "allow-declarations", "allow-named-functions"]	0

- prefer-for-of	如果索引仅用于访问被迭代的数组，则建议对循环的标准进行循环。当不需要索引时，for(of)循环更容易实现和读取。	无	"prefer-for-of": true	0

- promise-function-async	要求返回promise的任何函数或方法被标记为异步。	"检查的函数类型""check-function-declaration"" 
""check-function-expression"" 
""check-arrow-function"" 
""check-method-declaration"" 
"	"promise-function-async": [true, "check-function-declaration", "check-method-declaration"]	TYPE
typedef	需要存在类型定义。	"可以选择提供几个参数:
""call-signature"" 检查函数的返回类型。
""arrow-call-signature""检查返回箭头函数的类型。
""parameter"" 检查非箭头函数的函数参数的类型说明符。
""arrow-parameter"" 检查箭头函数的函数参数的类型说明符。
""property-declaration"" 检查接口属性的返回类型。
""variable-declaration"" 检查不具约束力的变量声明。
""member-variable-declaration"" 检查成员变量声明。
""object-destructuring"" 检查对象destructuring声明。
""array-destructuring"" 检查数组destructuring声明。
"	"typedef": [true, "call-signature", "parameter", "member-variable-declaration"]	TS

- typedef-whitespace	确定类型说明符中的冒号之前是否需要空格。	两个参数都是对象。第一个参数指定在typedef冒号的左边应该有多少空间。第二个参数指定在typedef冒号的右边应该有多少空间。每个键都应该具有“onespace”、“space”或“nospace”的值	"""typedef-whitespace"": [
  true,
  {
    ""call-signature"": ""nospace"",
    ""index-signature"": ""nospace"",
    ""parameter"": ""nospace"",
    ""property-declaration"": ""nospace"",
    ""variable-declaration"": ""nospace""
  },
  {
    ""call-signature"": ""onespace"",
    ""index-signature"": ""onespace"",
    ""parameter"": ""onespace"",
    ""property-declaration"": ""onespace"",
    ""variable-declaration"": ""onespace""
  }
]"	TS FIX

- unified-signatures	警告任何两个可以通过使用联合或可选方式统一为一个参数的重载	无	"unified-signatures": true	TS


## Maintainability	可维护性	这些规则使得代码维护更加容易	

规则名	功能	配置参数	举例	备注

- cyclomatic-complexity	赋予圈复杂度阈值。圈复杂度是表示函数复杂度的代码度量。高圈复杂度表示容易混淆的代码，可能容易出错或难于修改。	可以指定圈复杂度的可选上限。如果没有提供限制选项，则使用默认值20。	"cyclomatic-complexity": [true, 20]	0

- deprecation	当使用废弃的api时发出警告。	无	"deprecation": true	TYPE

- eofline	确保文件以换行结束。不支持对单行文件进行修复。	无	"eofline": true	FIX

- indent	用制表符或空格执行缩进。	"必须提供以下参数之一:
spaces 
tabs
第二个可选参数指定缩进大小2/4
自动修复只会将无效的缩进空格转换为所需的类型，不会修复无效的空格大小。
"	"indent": [true, "spaces", 4]	FIX
linebreak-style	执行一致的换行样式。	"必须提供以下选项之一:
""LF"" 
""CRLF""
"	"linebreak-style": [true, "CRLF"]	FIX

- max-classes-per-file	一个文件中类数量的最大值	一个必需的参数是一个整数，它指示文件中可以出现的类的最大数量。可以提供一个可选的参数“exclude-class-expression”，以排除来自整个类计数的类表达式。	"max-classes-per-file": [true, 5, "exclude-class-expressions"]	0

- max-file-line-count	要求文件保持在一定数量的行之下。文件保持较小、单一用途和可维护性。	指示行数最大的整数。	"max-file-line-count": [true, 300]	0

- max-line-length	要求行的最大长度	可接受一个整数参数或一个密钥对象	"max-line-length": [true, {"limit": 120, "ignore-pattern": "^import |^export {(.*?)}"}]	0

- no-default-export	ES6-style不允许导出default模块	无	"no-default-export": true	0

- no-duplicate-imports	不允许从同一模块多次导入	无	"no-duplicate-imports": true	0

- no-mergeable-namespace	不允许可以合并同一文件中的命名空间	无	"no-mergeable-namespace": true	TS

- no-require-imports	不允许调用require()。	无	"no-require-imports": true	0

- object-literal-sort-keys	检查对象文本中的键的命令。有助于防止合并冲突	"默认情况下，此规则检查键是按字母顺序排列。以下可以选择通过：
“ignore-case” 将键进行比较以不区分大小写的方式。
“match-declaration-order” 愿意使用密钥对象的上下文类型文本的排序，如：
interface I { foo: number; bar: number; } const obj: I = { foo: 1, bar: 2 };
如果找不到上下文类型，将改用字母排序。
“shorthand-first” 强制短表达优先，如：
const obj = { a, c, b: true };
"	"object-literal-sort-keys": [true, "ignore-case", "match-declaration-order", "shorthand-first"]	0

- prefer-const	要求变量声明如果可能，使用const而不是var	"一个可选的对象包含“destructuring”属性与两个可能的取值:
“any” (default) -如果析构中的任何变量都可以是Const，则此规则对这些变量发出警告。
“all” -只有当销毁中的所有变量都可以被构造时才会发出警告。
"	"prefer-const": [true, {"destructuring": "all"}]	FIX

- prefer-readonly	如果私有变量从未在构造函数之外被修改，则需要将它们标记为只读。	如果指定only-inline-lambdas则只有立即声明的箭头函数才会被检查	"prefer-readonly": [true, "only-inline-lambdas"]	TS TYPE

- trailing-comma	需要或不允许在数组和对象文字、析构赋值、函数类型、命名的导入和导出以及函数参数中使用尾逗号。	"一个具有multiline 和 singleline键的对象的参数。两者都可以设置为字符串(“always”或“never”)或对象。
对象可以包含以下任意键:“数组”、“对象”、“函数”、“导入”、“导出”和“类型文字”;
每个键可以有以下值之一:“always”、“never”和“ignore”。
任何丢失的键将默认为“ignore。“multiline检查多行对象文字。“singleline”检查单行对象文字。
"	"""trailing-comma"": [
  true,
  {
    ""multiline"": {
      ""objects"": ""always"",
      ""arrays"": ""always"",
      ""functions"": ""never"",
      ""typeLiterals"": ""ignore""
    },
    ""esSpecCompliant"": true
  }
]"	FIX


## Functionality	功能性	这些规则捕获了JS编程中常见的错误或容易产生错误的构造		

规则名	功能	配置参数	举例	备注

- await-promise	警告期待的值不是promise。等待非promise值通常是程序员错误	任何附加类的字符串名称的列表，这些类也应该被视为承诺。	"await-promise": [true, "Thenable"]	TS TYPE

- ban-comma-operator	不允许使用逗号运算符.使用逗号操作符可以为许多不明显的错误创建可能	无	"ban-comma-operator": true	0
ban	禁止使用特定函数或全局方法	"被禁止的函数或方法的列表，格式如下
禁止 functions: 
o 只是函数名称: ""functionName""
o 具有一个函数名元素的数组: [""functionName""]
o 对象格式: {""name"": ""functionName"", ""message"": ""optional explanation message""}
禁止methods: 
o 具有对象名称、方法名称和可选消息的数组: [""functionName"", ""methodName"", ""optional message""]
o 对象格式: {""name"": [""objectName"", ""methodName""], ""message"": ""optional message""} 
 还可以禁止深度嵌套的methods: {""name"": [""foo"", ""bar"", ""baz""]} bans foo.bar.baz()
 第一个元素可以包含匹配所有内容的通配符(*) {""name"": [""*"", ""forEach""]} bans [].forEach(...), $(...).forEach(...), arr.forEach(...), etc.
"	"""ban"": [
  true,
  ""eval"",
  {""name"": ""$"", ""message"": ""please don't""},
  [""describe"", ""only""],
  {""name"": [""it"", ""only""], ""message"": ""don't focus tests""},
  {
    ""name"": [""chai"", ""assert"", ""equal""],
    ""message"": ""Use 'strictEqual' instead.""
  },
  {""name"": [""*"", ""forEach""], ""message"": ""Use a regular for loop instead.""}
]"	0

- curly	强制if/for/do/while带括号	"可以提供以下选项之一
""as-needed""禁止不必要的大括号
""ignore-same-line""跳过在一行上的控制流语句的大括号，并开始与它们的control-flow关键字在同一行上。
"	"curly": [true, "as-needed"]	FIX

- forin	需要在for in语句中使用if进行过滤。防止对从对象s原型继承的属性的意外迭代，还可以考虑使用Map或Set来存储对象集合。使用对象有时会导致边缘情况错误	无	"forin": true	0

- import-blacklist	不允许通过import 或 require直接导入指定的模块，相反，只能从该模块导入子模块。有些库允许导入子模块而不是整个模块。这是很好的实践，因为它避免加载未使用的模块。	列入黑名单的模块列表。	"import-blacklist": [true, "rxjs", "lodash"]	0

- label-position	只允许标签break or continue在合理的位置。此规则只允许标签在do/for/while/switch里	无	"label-position": true	0

- no-arg	不允许使用arguments.callee。它使得各种性能优化是不可能的。	无	"no-arg": true	0

- no-bitwise	不允许位运算（ &, &=, |, |=, ^, ^=, <<, <<=, >>, >>=, >>>, >>>=, ~）此规则不禁止对交叉类型和联合类型使用&和\。位运算符常常是拼写错误。位运算也降低了可维护性。	无	"no-bitwise": true	0

- no-conditional-assignment	不允许在条件句中进行任何类型的赋值。这样做常常是拼写错误。也降低了可维护性。	无	"no-conditional-assignment": true	0

- no-console	禁止使用指定的控制台方法	要禁止的方法名称列表。如果没有提供任何方法名，则禁止所有控制台方法。	"no-console": [true, "log", "error"]	0

- no-construct	不允许访问字符串、数字和布尔值的构造函数。不允许new Number(foo)但允许 Number(foo)	无	"no-construct": true	0

- no-debugger	不允许调试器语句	无	"no-debugger": true	0

- no-duplicate-super	警告如果‘Super()’在构造函数中出现两次。第二个对‘Super()’的调用将在运行时失败。	无	"no-duplicate-super": true	0

- no-duplicate-switch-case	防止switch语句中的重复情况。	无	"no-duplicate-switch-case": true	0

- no-duplicate-variable	不允许在同一块范围内重复变量声明。这个规则只在使用var关键字时有用-编译器将检测let和const变量的重声明。	"check-parameters"检查与参数同名的变量	"no-duplicate-variable": [true, "check-parameters"]	0

- no-dynamic-delete	禁止使用带有计算键表达式的DELETE运算符。删除动态计算的密钥是危险的	无	"no-dynamic-delete": true	0

- no-empty	不允许空块。内部有注释的Block不被认为是空的。	如果指定了allow-empty-catch，那么CATCH块就允许为空。如果指定了allow-empty-functions，则函数定义允许为空.	"no-empty": [true, "allow-empty-catch"]	0

- no-eval	不允许eval函数调用。Eval()是危险的，因为它允许以完全权限执行任意代码。	无	"no-eval": true	0

- no-floating-promises	函数返回的promise必须得到适当处理。创建承诺而不存储或返回可能会让其他代码独立于其结果运行。不确定的行为取决于外部的时间因素。	任何其他应该作为承诺处理类名称的列表	"no-floating-promises": [true, "JQueryPromise"]	TS TYPE

- no-for-in-array	不允许使用FOR-IN循环对数组进行迭代。for-in将数组的索引作为字符串迭代，忽略数组中的任何“漏洞”	无	"no-for-in-array": true	TYPE

- no-implicit-dependencies	不允许导入项目的Package.json中没有列出为依赖项的模块，不允许导入安装在包根目录之上的临时依赖项和模块。	默认情况下，规则会查看“dependencies”和“peerDependencies”。通过添加“dev”选项，规则将查看“devDependations”,通过添加“optional”选项，规则还会查看“optionalDependations”。	"no-implicit-dependencies": [true, "dev"]	0

- no-inferred-empty-object-type	不允许在函数和构造函数调用{}(空对象类型)的类型推断。当函数或构造函数可以使用类型参数调用，但没有提供或可推断的参数时，类型记录默认为{}。这通常是不可取的，因为调用的目的是更具体的类型。	无	"no-inferred-empty-object-type": true	TS TYPE

- no-invalid-template-strings	警告在非模板字符串中使用${。	无	"no-invalid-template-strings": true	0

- no-invalid-this	不允许在类之外使用this关键字。	check-function-in-method不允许在类方法中的函数中使用this关键字。	"no-invalid-this": [true, "check-function-in-method"]	0

- no-misused-new	警告明显试图为接口或类定义new构造函数的尝试。	无	"no-misused-new": true	TS

- no-null-keyword	不允许使用空关键字,这个规则确保只使用undefined的。	无	"no-null-keyword": true	FIX

- no-object-literal-type-assertion	禁止在类型断言表达式中出现对象文字,any是允许的	无	"no-object-literal-type-assertion": true	TS

- no-return-await	不允许return await。异步函数总是将返回值包装在一个Promise中，使用return await只是添加额外的时间。	无	"no-return-await": true	FIX

- no-shadowed-variable	不允许隐藏变量声明。隐藏变量会掩盖对变量的访问，并模糊标识符实际引用的值。	您可以选择传递一个对象来禁用对某些类型声明的检查。可能的键是“class”、“enum”、“function”、“import”、“interface”、“namespace”、“typeAlias”和“typeParameter”。只需将要禁用的检查的值设置为false即可。所有检查默认为true，即默认情况下启用。请注意，不能禁用变量和参数。	"""no-shadowed-variable"": [
  true,
  {
    ""class"": true,
    ""enum"": true,
    ""function"": true,
    ""interface"": false,
    ""namespace"": true,
    ""typeAlias"": false,
    ""typeParameter"": false
  }
]"	0

- no-sparse-arrays	禁止数组文本包含缺少的元素。缺少的元素可能是意外复制的逗号	无	"no-sparse-arrays": true	0

- no-string-literal	禁止不必要的字符串文字属性访问。	无	"no-string-literal": true	FIX

- no-string-throw	抛出纯字符串或字符串连接的标志。只有错误对象包含与当前堆栈跟踪等价的.stack成员。.stack	无	"no-string-throw": true	FIX

- no-submodule-imports	不允许import任何子模块。某些包的子模块被视为私有api，而导入路径可能会在不破坏的情况下进行更改。最好还是坚持顶级的一揽子import。	白名单包或子模块名称的列表	"no-submodule-imports": [true, "rxjs", "@angular/platform-browser", "@angular/core/testing"]	0

- no-switch-case-fall-through	不允许通过case顺序执行，在switch语句中，这样做通常是无意的，并且是一个bug。		"no-switch-case-fall-through": true	0

- no-this-assignment	不允许不必要的引用	"可以提供两个选项的对象:
allow-destructuring 允许使用析构函数访问成员
allowed-names 可以指定为与允许的变量名匹配的正则表达式列表。
"	"no-this-assignment": [true, {"allowed-names": ["^self$"], "allow-destructuring": true}]	0

- no-unbound-method	在方法调用之外使用方法时发出警告。当作为独立变量传递时，类函数不保留类作用域。	“ignore-static”忽略静态方法	"no-unbound-method": [true, "ignore-static"]	TS TYPE

- no-unnecessary-class	不允许非严格必要的类。	"可以提供三个参数
""allow-constructor-only""忽略成员为构造函数的类。
""allow-empty-class""忽略类DemoClass{}
""allow-static-only""忽略成员是静态的类。
"	"no-unnecessary-class": ["allow-empty-class", "allow-constructor-only"]	0

- no-unsafe-any	在动态方式中使用“any”类型的表达式时发出警告。只有在使用{}\NULL\undefined的情况下才允许使用	无	"no-unsafe-any": true	TS TYPE

- no-unsafe-finally	不允许在最终块中使用控制流语句，例如return, continue, break, throws。	无	"no-unsafe-finally": true	0

- no-unused-expression	不允许未使用的表达式语句。即不是赋值或函数调用的表达式语句(因此通常是无操作)	"可以选择提供两个参数:
allow-fast-null-checks允许使用逻辑运算符执行快速空值检查，并执行方法或函数调用的副作用
allow-new允许副作用的新表达式
allow-tagged-template允许标签模板的副作用
"	"no-unused-expression": [true, "allow-fast-null-checks"]	0

- no-unused-variable	不允许使用未使用的导入、变量、函数和私有类成员。类似于tsc的名词使用参数和名词使用本地选项，但不中断代码编译。	"可以选择提供2个可选参数:
• ""check-parameters""不允许使用未使用的函数和构造函数参数。这个选项是实验性的，不与使用抽象方法声明的类一起工作。
• {""ignore-pattern"": ""pattern""}其中pattern是区分大小写的正则表达式。与模式匹配的变量名和导入将被忽略。
"	"no-unused-variable": [true, {"ignore-pattern": "^_"}]	TS FIX TYPE

- no-use-before-declare	不允许在变量声明之前使用它们。这条规则在使用var关键字时非常有用，因为编译器将自动检测是否在声明之前使用块范围的let和const变量。由于大多数现代的TS都不使用var，所以通常不建议使用这个规则，并且出于遗留目的而保留这个规则。它的计算速度很慢，在内置的配置预置中没有启用，不应该用于通知TSLint设计决策。	无	"no-use-before-declare": true	TYPE

- no-var-keyword	不允许使用var关键字。用let或const代替。由const声明的变量，让它们具有定义它们的块的作用域，并且不允许在声明之前使用它们，也不允许在另一个const或let中重新声明变量。	无	"no-var-keyword": true	FIX

- no-void-expression	不允许声明语句位置显示类型为void的表达式。将类型为void的表达式的结果返回是错误的。	如果提供了ignore-arrow-function-shorthand ，则() => returnsVoid() 将被允许。否则，它必须写成() => { returnsVoid(); }		TYPE

- prefer-conditional-expression	建议使用条件表达式，而不是在if语句的每个分支中分配相同的内容。这减少了重复，并可以消除不必要的变量声明。	如果指定了check-else-if，则规则还检查嵌套的If -else- If语句。	"prefer-conditional-expression": [true, "check-else-if"]	0

- prefer-object-spread	在Object.assign()中强制使用ES2015对象扩展操作符。对象扩展允许更好的类型检查和推断。	无	"prefer-object-spread": true	FIX

- radix	在调用parseInt时需要指定基数参数。当没有指定基数时，不同的实现会产生不同的结果，通常默认值为10。	无	"radix": true	0

- restrict-plus-operands	当添加两个变量时，操作数必须同时为类型号或类型字符串。	无	"restrict-plus-operands": true	TYPE

- strict-boolean-expressions	限制布尔表达式中允许的类型。默认情况下，只允许布尔值。检查以下节点:!,&&和||操作符；三目运算条件表达式中的条件；if、for、while和do-while语句的条件。	"allow-null-union允许包含null的联合类型。
o 它本身不允许 null
o 如果没有‘–strictNullChecks’编译器选项，这将允许除字符串、数字或枚举之外的任何内容。
allow-undefined-union 允许包含未定义的联合类型。
o 它本身不允许undefined
o 同上
allow-string允许字符串 
o 它不允许包含字符串的联合类型。
o 它不允许字符串文字类型。
allow-number 允许的数字。
o 它不允许包含数字的联盟。
o 它不允许枚举或数字文字类型。
allow-mix 允许上面的多个元素同时出现。
o 例如string | number 或者RegExp | null | undefined 通常是不允许的
o ""foo"" | ""bar"" | undefined 一直允许，因为它只有一种情况是假的
allow-boolean-or-undefined 允许 boolean | undefined. 
o 也允许 true | false | undefined.
o 不允许 false | undefined.
o 这个选项是allow-undefined-union的子集，所以你不需要同时启用两个选项。
"	"""strict-boolean-expressions"": [
  true,
  ""allow-null-union"",
  ""allow-undefined-union"",
  ""allow-string"",
  ""allow-number""
]"	TS TYPE

- strict-type-predicates	警告总是为真或总是为假。适用于与常量的比较类型,与‘null’/’undefined’的相等比较(TypeScript不能让您比较1 === 2，但是有一个例外，1 === undefined。)	无	"strict-type-predicates": true	TS TYPE

- switch-default	在所有switch语句中都需要一个默认情况。	无	"switch-default": true	0

- triple-equals	使用恒等判断	"可以选择提供两个参数:
""allow-null-check""当比较为空时，允许==和!=。
""allow-undefined-check""当与未定义的进行比较时，允许==和!=。
"	"triple-equals": [true, "allow-undefined-check"]	0

- typeof-compare	确保typeof的结果与正确的字符串值进行比较	无	"typeof-compare": true	0

- use-default-type-parameter	警告显式指定类型参数是该类型参数的默认值。	无	"use-default-type-parameter": true	TS TYPE

- use-isnan	强制使用isNaN()函数检查NaN引用，而不是与NaN常量进行比较。因为NaN !== NaN	无	"use-isnan": true	0



Style	风格	这些规则在代码库中强制执行一致的样式		
规则名	功能	配置参数	举例	备注
align	执行垂直对齐	"可以选择提供五个参数:
""parameters""检查功能参数的一致性。
""arguments""检查函数调用参数的对齐方式。
""statements""检查语句对齐。
""members""检查类、接口、类型文字、对象文字和对象破坏的成员的对齐方式。
""elements""检查数组迭代元素、数组破坏和元组元素的对齐方式。
"	"align": [true, "parameters", "statements"]	FIX
array-type	需要对数组使用T[]或‘Array'	"必须提供以下参数之一:
""array""对所有类型的T强制使用T[]。
""generic""强制对所有类型T使用Array<T> 
""array-simple""如果T是简单类型(原语或类型引用)，则强制使用T[]。
"	"array-type": [true, "array-simple"]	TS FIX
arrow-parens	需要用圆括号括住箭头函数定义的参数。与其他箭头函数定义保持风格一致性。	如果指定了bar -single-arg-parens，那么带有一个参数的箭头函数在类型文件允许的情况下不能使用括号。	"arrow-parens": [true, "ban-single-arg-parens"]	FIX
arrow-return-shorthand	建议将() => { return x; }替换为 () => x。不需要在箭头 lambdas中包含return和{}括号	如果指定了multiline，那么即使函数跨越了多行，也会发出警告。	"arrow-return-shorthand": [true, "multiline"]	FIX
binary-expression-operand-order	在二进制表达式中，如果可能的话，文字应该总是在右边，即x+1而不写成1+x	无	"binary-expression-operand-order": true	0
callable-types	只需调用签名的接口或文字类型可以作为函数类型写入。	无		TS FIX
class-name	强制执行已加密的类和接口名称。	无	"class-name": true	0
comment-format	对单行注释执行格式规则。	"可以选择提供三个参数:
""check-space""要求所有单行注释必须以空格开头。
""check-lowercase""要求注释的第一个非空格字符必须是小写的。
""check-uppercase""要求注释的第一个非空格字符必须是大写字符。
对于""check-lowercase""或""check-uppercase""的异常可以使用可以作为最后一个参数传递的对象来管理。在这个对象中可以提供两个选项中的一个：
`""ignore-words""`字符串数组——在注释开始时将被忽略的单词。
`""ignore-pattern""`字符串-正则表达式模式，在注释开始时将被忽略。
"	"comment-format": [true, "check-lowercase", {"ignore-pattern": "STD\\w{2,3}\\b"}]	FIX
completed-docs	强制JSDoc对重要项目的注释进行填充。少使用这个规则		"""completed-docs"": [
  true,
  {
    ""enums"": true,
    ""functions"": {""visibilities"": [""exported""]},
    ""methods"": {""locations"": ""instance"", ""privacies"": [""public"", ""protected""]},
    ""properties"": {
      ""tags"": {""content"": {""see"": [""#.*""]}, ""existence"": [""inheritdoc""]}
    }
  }
]"	TYPE
encoding	强制UTF-8文件编码	无	"encoding": true	0
file-header	对所有文件强制执行特定的头注释，并与正则表达式匹配。	第一个选项是强制性的，它是一个正则表达式，所有头都应该匹配。第二个参数是可选的，它是一个字符串，如果启用了修复，并且没有找到与第一个参数匹配的标头，则应该作为头注释插入该字符串。	"file-header": [true, "Copyright \\d{4}", "Copyright 2017"]	FIX
import-spacing	确保导入语句关键字之间的适当间隔	无	"import-spacing": true	0
interface-name	要求接口名以大写“i”开头	"必须提供以下两个选项之一:
""always-prefix""要求接口名以“I”开头
""never-prefix""要求接口名称没有“I”前缀
"	"interface-name": [true, "always-prefix"]	TS
interface-over-type-literal	更喜欢接口声明而不是类型文字。接口通常比类型文字更好，因为接口可以实现、扩展和合并。	无	"interface-over-type-literal": true	TS FIX
jsdoc-format	强制执行JSDoc注释的基本格式规则。	您也可以选择指定“Check-Multilin-start”选项来强制执行多行JSDoc注释的第一行为空	"jsdoc-format": [true, "check-multiline-start"]	0
match-default-export-name	要求默认导入与其导入的声明具有相同的名称。对匿名默认导出不做任何操作。	无	"match-default-export-name": true	TS TYPE
newline-before-return	在返回之前强制执行空行，而不是块中的唯一行。	无	"newline-before-return": true	0
newline-per-chained-call	要求将链接的方法调用拆分到单独的行中。			0
new-parens	通过new关键字调用构造函数时需要括号。	无	"new-parens": true	0
no-angle-bracket-type-assertion	要求类型断言使用as Type，而不是<Type>，只有as在 .tsx文件中工作. 此规则确保在代码库中具有一致的类型断言样式。	无	"no-angle-bracket-type-assertion": true	TS FIX
no-boolean-literal-compare	在与布尔文本比较时发出警告这种做法是不必要的	无	"no-boolean-literal-compare": true	TS FIX TYPE
no-consecutive-blank-lines	不允许一行中空行。	可以指定可选的最大允许顺序空格数。如果不提供任何值，则将使用默认值1。	"no-consecutive-blank-lines": [true, 2]	FIX
no-irregular-whitespace	不允许文件中不规则的空白，包括字符串和注释。	无	"no-irregular-whitespace": true	FIX
no-parameter-properties	不允许类构造函数中的参数属性。	无	"no-parameter-properties": true	TS
no-redundant-jsdoc	禁止重复类型记录功能的JSDoc。	无	"no-redundant-jsdoc": true	TS
no-reference-import	如果你导入Foo的话不要<reference types="foo" />	无		TS
no-trailing-whitespace	不允许在行尾使用尾随空格。	"可能的设置是:
""ignore-template-strings"":允许模板字符串中的尾随空格。
""ignore-comments"":允许注释中的尾空白。
""ignore-jsdoc"":只允许在JSDoc注释中使用尾随空格。
""ignore-blank-lines"":允许空行上的尾随空格。
"	"no-trailing-whitespace": [true, "ignore-jsdoc"]	FIX
no-unnecessary-callback-wrapper	用f代替x=>f(X)。要捕获更多的情况，启用only-arrow-functions和 arrow-return-shorthand。如果函数被直接调用，通常没有理由用回调包装它。这样做会创建额外的内联lambda，从而减缓运行时的速度。	无	"no-unnecessary-callback-wrapper": true	0
no-unnecessary-initializer	禁止使用var或let声明或破坏初始化器使其初始化为‘undefined’JavaScript中的值默认为未定义。没有必要手动这样做。	无	"no-unnecessary-initializer": true	FIX
no-unnecessary-qualifier	当命名空间限定符(A.x)不必要时发出警告。	无	"no-unnecessary-qualifier": true	TS FIX TYPE
number-literal-format	检查十进制文本应该以‘0.’开头，而不是以‘.’开头，并且不应该以尾随‘0’结尾。	无	"number-literal-format": true	0
object-literal-key-quotes	执行一致的对象文字属性引用样式。比如这两个对象是等价的:var object1 = {property: true};var object2 = { “property”: true}	"可能的设置是:
""always"":应该总是引用属性名。(这是默认的)。
""as-needed"":只能引用需要引号的属性名(例如，包含空格的属性名)。
""consistent"":属性名应该全部引用或不引用。
""consistent-as-needed"":如果任何属性名称都需要引号，则必须引用所有属性。否则，不引用属性名。
对于ES6，计算属性名称({[name]: value})和方法({foo()})不需要引用。"	"object-literal-key-quotes": [true, "always"]	FIX
object-literal-shorthand	使用ES6对象文字简写。	如果提供了never选项，则任何shorthand对象文字语法都将导致失败。	"object-literal-shorthand": [true, "never"]	FIX
one-line	要求指定的令牌与前面的表达式位于同一行。	"可以选择提供五个参数:
""check-catch""检查catch与try的闭包位于同行。
""check-finally""检查finally是否与catch的结束大括号同行。
""check-else""检查else是否与if的结束大括号同行。
""check-open-brace""检查打开的大括号是否落在与其前面表达式相同的行上。
""check-whitespace""检查上述情况前面的空格
"	"one-line": [true, "check-catch", "check-finally", "check-else"]	FIX
one-variable-per-declaration	不允许在同一个声明语句中定义多个变量。	"可以选择提供一个参数:
ignore-for-loop允许在for循环声明中定义多个变量。
"	"one-variable-per-declaration": [true, "ignore-for-loop"]	0
ordered-imports	"要求将导入语句按字母顺序分组。对ES6进口实施一致的排序：
命名导入必须按字母顺序排列(即“从”foo“导入{A，B，C}；”) 
导入源必须在组内按字母顺序排列，即：从“a”以foo形式导入；从“b”以bar形式导入*；
进口类别由空白行划定。您可以使用这些对您喜欢的导入进行分组，例如通过第一次或按主题对第三方进行分组，或者可以强制执行由第三方目录、父目录和当前目录组成的分组。"	"
"	"""ordered-imports"": [
  true,
  {
    ""import-sources-order"": ""lowercase-last"",
    ""named-imports-order"": ""lowercase-first""
  }
]"	FIX
prefer-function-over-method	警告类方法不允许使用'this'。	“allow-public” 不包含对公共方法的检查。 “allow-protected” 不包含对受保护方法的检查。	"prefer-function-over-method": [true, "allow-public", "allow-protected"]	0
prefer-method-signature	在接口和类型中更喜欢foo(): void而不是foo: () => void	无	"prefer-method-signature": true	FIX
prefer-switch	与具有simple ===比较的if语句相比，更喜欢使用switch语句	属性为min-cases的可选对象。这是建议使用switch语句之前所需的数量情况。默认为3。	"prefer-switch": [true, {"min-cases": 2}]	0
prefer-template	更喜欢模板表达式而不是字符串文字连接	如果指定了allow-single-concat，则允许使用单个连接(x + y)，但不能使用更多(x + y + z)。	"prefer-template": [true, "allow-single-concat"]	0
prefer-while	宁愿选择while循环，而不是没有初始化器和增量器的for循环。	无	"prefer-while": true	FIX
quotemark	对字符串文字需要单引号或双引号。	"可以选择提供五个参数:
""single"" 强制单引号
""double"" 强制双引号
""jsx-single""强制JSX属性使用单引号。
""jsx-double""强制JSX属性使用双引号。
""avoid-escape""允许您在通常需要转义的情况下使用“other”引用标记。
例如，[true, ""double"", ""avoid-escape""]不会在字符串文字'Hello ""World""'上报告失败。
"	"quotemark": [true, "single", "jsx-double"]	FIX
return-undefined	喜欢在空函数中使用return;在有返回值的函数中return undefined;。		"return-undefined": true	TYPE
semicolon	在每个语句的末尾强制使用一致的分号。	"必须提供以下参数之一:
""always""在每个语句的末尾强制使用分号。
""never""不允许分号在每个语句的末尾，除非必要时除外。
可以选择提供以下参数:
""ignore-interfaces""跳过检查接口成员末尾的分号。
""ignore-bound-class-methods""在绑定类方法结束时跳过检查分号。
""strict-bound-class-methods""禁用绑定类方法的任何特殊处理，并将它们视为任何其他赋值。这个参数会重写""ignore-bound-class-methods"".
"	"semicolon": [true, "always", "ignore-interfaces"]	FIX
space-before-function-paren	要求或不允许在函数括号之前使用空格	"一个参数可能包含匿名、命名和异步的键，这些键应该设置为""always""或""never""
""anonymous"" 在匿名函数的开头部分前检查
""named"" 在指定的函数中检查开头的参数
""asyncArrow"" 在异步箭头函数的开始参数之前检查
""method"" 在类方法的开始参数之前检查
""constructor"" 在类构造函数的开始段之前检查
"	"space-before-function-paren": [true, "always"]	FIX
space-within-parens	在括号内强制空格或不允许空格。始终允许使用空括号()。	您可以在括号内强制空格的数量。		FIX
switch-final-break	检查switch语句的最终子句是否以break结尾;	如果没有通过任何选项，最后‘break;’是被禁止的。如果“always”选项被指定，除非控制流以其他方式转义否则总是存在‘break;’。	"switch-final-break": [true, "always"]	0
type-literal-delimiter	检查类型文字成员是否由分号分隔。为多行类型的文字强制执行一个尾分号。	无	"type-literal-delimiter": true	TS
variable-name	检查各种错误的变量名。	"可以选择提供五个参数:
• ""check-format"": 只允许 lowerCamelCased 或 UPPER_CASED 变量名
o ""allow-leading-underscore""允许在开头处的下划线(只有在指定“检查格式”时才有效果)
o ""allow-trailing-underscore""允许在结尾处下划线。(只有在指定“检查格式”时才有效果)
o ""allow-pascal-case""允许PascalCase除了lowerCamelCase.
o ""allow-snake-case""允许Snake_Case和lowerCamelCase一起使用
• ""ban-keywords"":不允许使用某些类型记录关键字作为变量或参数名称。 
o 他们是: any, Number, number, String, string, Boolean, boolean, Undefined, undefined
"	"variable-name": [true, "ban-keywords", "check-format", "allow-leading-underscore"]	0
whitespace	强制执行空白样式约定。	"可选择地提供10个参数:
""check-branch""检查分支语句 (if/else/for/while) 
""check-decl""检查变量声明在等于令牌周围有空格。
""check-operator""检查操作符标记周围的空格。
""check-module""检查导入和导出语句中的空格。
""check-separator""检查分隔符标记后的空格(,/;).
""check-rest-spread"" 检查 rest/spread 后面的空格(...).
""check-type"" 在变量类型规范之前检查空格。
""check-typecast"" 检查类型广播与其目标之间的空白。
""check-type-operator"" 检查类型操作符| 和 &之间的空格
""check-preblock"" 检查块的开头大括号前的空格
"	"whitespace": [true, "check-branch", "check-operator", "check-typecast"]	FIX
