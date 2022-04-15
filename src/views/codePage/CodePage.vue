<template>
  <div>
    <codemirror v-model="code" :options="cmOption" @focus="sqlCodeFocus(code)" @blur="sqlCodeBlur(code)" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/sql/sql.js';
import 'codemirror/theme/solarized.css';

@Component({ components: { codemirror } })
export default class CodePage extends Vue {
  code = `
-- sql语句的注意 : 1 以;作为结束符  2 不区分大小写
-- 01 mysql 数据库的操作

    -- **链接数据库**
    mysql -uroot -pmysql
    
    -- 不显示密码
    mysql -uroot -p
    mysql

    -- 退出数据库
    exit/quti/ctrl + d
    

    -- sql语句最后需要有分号;结尾
    -- 显示数据库版本 version
    select version();

    -- 显示时间
    select now();
    
    -- 查看当前使用的数据库
    select database();

    -- 查看所有数据库
    show databases;

    -- 创建数据库
    -- create database 数据库名 charset=utf8;
    create database python01;  # 可能会出现乱码
    create database python01 charset=utf8;

    -- 查看创建数据库的语句
    -- show create database ....
    show create database python01;
     

    -- 使用数据库
    -- use 数据库的名字
    use python01;

    -- 删除数据库
    -- drop database 数据库名;
    drop database python01;


--02 数据表的操作

    -- 查看当前数据库中所有表
    show tables;

    

    -- 创建表
      -- int unsigned 无符号整形
    -- auto_increment 表示自动增长
    -- not null 表示不能为空
    -- primary key 表示主键  数据库主键，指的是一个列或多列的组合，
    -- 其值能唯一地标识表中的每一行，通过它可强制表的实体完整性。
    -- 主键主要是用于其他表的外键关联，以及本记录的修改与删除。

    -- default 默认值
    -- create table 数据表名字 (字段 类型 约束[, 字段 类型 约束]);

    create table xxx(
        id int unsigned primary key not null auto_increment,
        name varchar(20) not null
    );

    -- 查看表结构
    -- desc 数据表的名字;
    desc xxx;
   
    -- 创建 classes 表(id、name)
        -- varchar表示可变长度的字符串
        --
    create table classes(
        id int unsigned primary key auto_increment not null,
        name varchar(20) not null
    );
    
    -- 创建 students 表(id、name、age、high (decimal)、gender (enum)、cls_id)
        --  decimal表示浮点数，如decimal(5,2)表示共存5位数，小数占2位，例如：185.88
        --  枚举类型(enum) 例如：enum("男性","女性","中性","保密")
    create table students(
        id int unsigned primary key auto_increment not null,
        name varchar(20) not null,
        age int unsigned,
        high decimal(5,2),
        gender enum("男性","女性","中性","保密") default "保密",
        cls_id int unsigned
    );
    

    -- 查看表的创建语句
    -- show create table 表名字;
   show create table xxx;


    -- 修改表-添加字段 mascot (吉祥物)
    -- alter table 表名 add 列名 类型;
   alter table classes add chongwu varchar(20) default"蛇";

    -- 修改表-修改字段：不重命名版
    -- alter table 表名 modify 列名 类型及约束;
    alter table classes modify mascot varchar(30) default"葫芦娃";


    -- 修改表-修改字段：重命名版
    -- alter table 表名 change 原名 新名 类型及约束;
    alter table classes change chongwu mascot varchar(20) default"法拉利";


    -- 修改表-删除字段
    -- alter table 表名 drop 列名;
    alter table classes drop mascot;


    -- 删除表
    -- drop table 表名;
    -- drop database 数据库;
   

    
--03 增删改查(curd)

    -- 增加
+-------+------------------+------+-----+---------+----------------+
| Field | Type             | Null | Key | Default | Extra          |
+-------+------------------+------+-----+---------+----------------+
| id    | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| name  | varchar(20)      | NO   |     | NULL    |                |
+-------+------------------+------+-----+---------+----------------+



        -- 全列插入
        -- insert [into] 表名 values(...)
        -- 主键字段 可以用 0  null   default 来占位
        -- 向classes表中插入 一个班级
        insert into classes values(1,"python大神班");
+--------+-------------------------------------------+------+-----+---------+----------------+
| Field  | Type                                      | Null | Key | Default | Extra          |
+--------+-------------------------------------------+------+-----+---------+----------------+
| id     | int(10) unsigned                          | NO   | PRI | NULL    | auto_increment |
| name   | varchar(20)                               | NO   |     | NULL    |                |
| age    | int(10) unsigned                          | YES  |     | NULL    |                |
| high   | decimal(5,2)                              | YES  |     | NULL    |                |
| gender | enum('男性','女性','保密')                  | YES  |     | 保密     |                |
| cls_id | int(10) unsigned                          | YES  |     | NULL    |                |
+--------+-------------------------------------------+------+-----+---------+----------------+

        -- 向students表插入 一个学生信息
        insert into students values(1,"班主任",18,166.66,2,111);
        insert into students values(0,"吴彦祖",42,188.88,1,222);
        insert into students values(null,"晨哥",28,188.88,1,333);

        -- 部分插入
        -- insert into 表名(列1,...) values(值1,...)
        insert into students(name) values("老王");

        -- 多行插入
        insert into students values(null,"老李",28,188.88,1,333),(null,"赵四",28,188.88,1,333);


    -- 修改
    -- update 表名 set 列1=值1,列2=值2... where 条件;
        -- 全部修改
        update students set high = 170.00;
        -- 按条件修改
        update students set high = 170.00 where id=3;
        -- 按条件修改多个值
        -- update students set gender ="",name = "xxx" ;
        update students set gender="中性",name="111" where id=3;
        
    -- 查询基本使用
        -- 查询所有列
        -- select * from 表名;
        select * from students;

        ---定条件查询
       select * from students where id=1;


        -- 查询指定列
        -- select 列1,列2,... from 表名;
        select name,gender from students;


        -- 可以使用as为列或表指定别名
        -- select 字段[as 别名] , 字段[as 别名] from 数据表;
       select name as "姓名",gender as "性别" from students;


        -- 字段的顺序
        select gender as "性别",name as "姓名" from students;
    

    -- 删除
        -- 物理删除
        -- delete from 表名 where 条件
       delete from students where id=3;
        -- 逻辑删除
        -- 用一个字段来表示 这条信息是否已经不能再使用了
        -- 给students表添加一个 is_delete 字段 bit 类型
        alter table students add is_delete bit default 0;
        update students set is_delete=1 where id = 1;
    -- 数据库备份与恢复(了解)
        -- mysqldump –uroot –p 数据库名 > python.sql;
        -- mysql -uroot –p 新数据库名 < python.sql;
        
        
        
        
-- 查询练习
    -- 查询所有字段
    -- select * from 表名;
    select * from students;

    -- 查询指定字段
    -- select 列1,列2,... from 表名;
    select name,gender from students;
    
    -- 使用 as 给字段起别名
    -- select 字段 as 名字.... from 表名;
    select name as "姓名",gender as "性别" from students;

    -- select 表名.字段 .... from 表名;
    select name as "姓名",gender as "性别" from students as s;

    
    -- 可以通过 as 给表起别名
    -- select 别名.字段 .... from 表名 as 别名;
    select s.name as "姓名",s.gender as "性别" from students as s;
    
    失败的select students.name, students.age from students as s;
    

    -- 消除重复行(查性别)
    
    -- distinct 字段 
    select gender from students;
    select distinct gender from students;
    

-- 条件查询
    -- 比较运算符
        -- select .... from 表名 where .....
        -- >
        -- 查询大于18岁的信息
        select * from students where age > 18;

        -- <
        -- 查询小于18岁的信息
        select * from students where age < 18;
        

        -- >=
        -- <=
        -- 查询小于或者等于18岁的信息
        select * from students where age <= 18;
        -- =
        -- 查询年龄为18岁的所有学生的名字
        (区别)select * from students where age = 18;


        -- != 或者 <>
        select * from students where age != 18;
        

    -- 逻辑运算符
        -- and
        -- 18和28之间的所以学生信息
        select * from students where age >=18 and age <=28;
        
        失败 select * from students where age>18 and <28;



        -- 18岁以上的女性
        select * from students where age > 18 and gender = 2;

        -- or
        -- 18以上或者身高高过180(包含)以上
        select * from students where age > 18 or height >= 180;


        -- not
        -- 不在 18岁以上的女性 这个范围内的信息
        -- select * from students where not age>18 and gender=2;
        select * from students where not (age > 18 and gender = 2);

            


    -- 模糊查询(where name like 要查询的数据)
        -- like 
        -- % 替换任意个
        -- _ 替换1个
        -- 查询姓名中 以 "小" 开始的名字
        select * from students where name like "小%";
        

        -- 查询姓名中 有 "小" 所有的名字
        select * from students where name like "%小%";

        -- 查询有2个字的名字
        select * from students where name like "__";
        

        -- 查询有3个字的名字
        select * from students where name like "___";
        

        -- 查询至少有2个字的名字
        select * from students where name like "__%";



    -- 范围查询
        -- in (1, 3, 8)表示在一个非连续的范围内
        -- 查询 年龄为18、34的姓名
        select * from students where age =18 or age = 34;
        select * from students where age in (18,34);
        
        -- not in 不非连续的范围之内
        -- 年龄不是 18、34岁之间的信息
        select * from students where age not in (18,34);
        
        (注意)select name from students where not age in (18,34);


        -- between ... and ...表示在一个连续的范围内
        -- 查询 年龄在18到34之间的的信息
        select * from students where age between 18 and 34;
        
        -- not between ... and ...表示不在一个连续的范围内
        -- 查询 年龄不在在18到34之间的的信息
        select * from students where age not between 18 and 34;
        
        失败的select * from students where age not (between 18 and 34);
        

    -- 空判断
        -- 判空is null
        -- 查询身高为空的信息
        select * from students where height is null;
        
        -- 判非空is not null
        select * from students where height is not null;
        
        失败select * from students where height not is  null;



-- 排序
    -- order by 字段
    -- asc从小到大排列，即升序
    -- desc从大到小排序，即降序

    -- 查询年龄在18到34岁之间的男性，按照年龄从小到大到排序
    select * from students where (age between 18 and 34) and gender = 1 order by age asc;
    -- 查询年龄在18到34岁之间的女性，身高从高到矮排序
    select * from students where (age between 18 and 34) and gender = 2 order by height desc;
    

    -- order by 多个字段
    -- 查询年龄在18到34岁之间的女性，身高从高到矮排序, 如果身高相同的情况下按照年龄从小到大排序
    select * from students where (age between 18 and 34) and gender = 2 order by height desc,age asc;

    -- 查询年龄在18到34岁之间的女性，身高从高到矮排序, 如果身高相同的情况下按照年龄从小到大排序,
    -- 如果年龄也相同那么按照id从大到小排序
    select * from students where (age between 18 and 34) and gender = 2 order by height desc,age asc,id desc;

    


-- 聚合函数
    -- 总数
    -- count
    -- 查询男性有多少人，女性有多少人
    select count(*) from students where gender = 1;
    select count(*) from students where gender = 2;

    -- 最大值
    -- max
    -- 查询最大的年龄
    select max(age) from students;

    -- 查询女性的最高 身高
    select max(height) from students where gender = 2;

    -- 最小值
    -- min
    select min(height) from students where gender = 2;
    
    -- 求和
    -- sum
    -- 计算所有人的年龄总和
    select sum(age) from students;

    
    -- 平均值
    -- avg
    -- 计算平均年龄
    select avg(age) from students;


    -- 计算平均年龄 sum(age)/count(*)
    


    -- 四舍五入 round(123.23 , 1) 保留1位小数
    -- 计算所有人的平均年龄，保留3位小数
    select round(avg(age),3) from students;

    -- 计算男性的平均身高 保留2位小数
    select round(avg(height),2) from students where gender = 1;
    

-- 分组

    -- group by
    -- 按照性别分组,查询所有的性别
    select gender from students group by gender;
    -- select name,gender from students group by gender;
    -- 失败select * from students group by gender;
    select * from students group by gender;
    -- 计算每种性别中的人数
    select count(*),gender from students group by gender;

    -- group_concat(...)
    -- 查询同种性别中的姓名
     select group_concat(name),gender from students group by gender;
    
    -- 查询每组性别的平均年龄
    select avg(age),gender from students group by gender;

    -- having(注意having和group by)
    (!)-- 查询平均年龄超过30岁的性别，以及姓名 having avg(age) > 30
    select gender,group_concat(name) from students 
    group by gender 
    having avg(age) > 30;
    
    -- 查询每种性别中的人数多于2个的信息
    select gender,group_concat(name) from students group by gender having count(*) > 2;

    -- with rollup 汇总的作用(了解)
    select gender,count(*) from students group by gender with rollup;

-- 分页
    -- limit start, count
    
    -- 限制查询出来的数据个数
    -- 查询前5个数据
    select * from students limit 5;
    
    -- 每页显示2个，第1个页面
    select * from students limit 0,2;

    -- 每页显示2个，第2个页面
    select * from students limit 2,2;

    -- 每页显示2个，第3个页面
    select * from students limit 4,2;

    -- 每页显示2个，第4个页面
    select * from students limit 6,2;
    

    -- 每页显示2个，显示第6页的信息, 按照年龄从小到大排序(limit 必须写到sql语句的最后)
    错误1 select * from students limit 10,2 order by age asc;
    
    -- 工作错误的写法
    错误2 select * from students limit 2*(6-1),2;
    
    -- limit 放在最后面(注意)
     


-- 连接查询
    -- inner join ... on
    -- select ... from 表A inner join 表B;
    select * from students inner join classes;
    
    -- 查询 有能够对应班级的学生以及班级信息
    select * from students inner join classes on students.cls_id = classes.id;

    -- 按照要求显示姓名、班级
    select students.name,classes.name from students inner join classes on students.cls_id = classes.id;

    -- 给数据表起名字
    select s.name,c.name from students as s inner join classes as c on s.cls_id = c.id;

    -- 查询 有能够对应班级的学生以及班级信息，显示学生的所有信息 students.*，只显示班级名称 classes.name.
    select s.*,c.name from students as s inner join classes as c on s.cls_id = c.id;
    
    -- 在以上的查询中，将班级姓名显示在第1列
    select c.name,s.* from students as s inner join classes as c on s.cls_id = c.id;

    -- 查询 有能够对应班级的学生以及班级信息, 按照班级进行排序
    -- select c.xxx s.xxx from students as s inner join clssses as c on .... order by ....;
    select c.name,s.* from students as s inner join classes as c on s.cls_id = c.id order by c.name;
    
    -- 当时同一个班级的时候，按照学生的id进行从小到大排序
    select c.name,s.* from students as s inner join classes as c on s.cls_id = c.id order by c.name,id asc;

    -- left join
    -- 查询每位学生对应的班级信息
    select * from students left join classes on students.cls_id = classes.id;
    -- select * from students right join classes on students.cls_id = classes.id;

    -- 查询没有对应班级信息的学生
    -- select ... from xxx as s left join xxx as c on..... where .....
    -- select ... from xxx as s left join xxx as c on..... having .....
    select * from students left join classes on students.cls_id = classes.id where classes.name is null;
    
    (注意)不建议使用 select * from students left join classes on students.cls_id=classes.id having classes.id is null;
    
    -- right join   on
    -- 将数据表名字互换位置，用left join完成


    

    -- 子查询
        -- 标量子查询: 子查询返回的结果是一个数据(一行一列)
        -- 列子查询: 返回的结果是一列(一列多行)

        -- 行子查询: 返回的结果是一行(一行多列)

        -- 查询出高于平均身高的信息(height)
        -- 1 查出平均身高
        select avg(height) from students ; -- 172
        -- 2 查出高于平均身高的信息
        select * from students where height >(select avg(height) from students) ;

        -- 查询学生的班级号能够对应的 学生名字
        -- select name from students where cls_id in (select id from classes);
        -- 1 查出所有的班级id
        select id from classes; -- 1,2
        -- 2 查出能够对应上班级号的学生信息
        select * from students where cls_id in (select id from classes);

     -- sql强化演练( goods 表练习)

    -- 查询类型 cate_name 为 '超级本' 的商品名称 name 、价格 price ( where )
    select name,price from goods where cate_name = "超级本";


    -- 显示商品的种类
    -- 1 分组的方式( group by ) 
    select cate_name from goods group by cate_name;

    -- 2 去重的方法( distinct )
    select distinct cate_name from goods;


    -- 求所有电脑产品的平均价格 avg ,并且保留两位小数( round )
    select round(avg(price),2) from goods;
    -- 显示 每种类型 cate_name (由此可知需要分组)的 平均价格
    select cate_name,avg(price) from goods group by cate_name;


    -- 查询 每种类型 的商品中 最贵 max 、最便宜 min 、平均价 avg 、数量 count
    select max(price),min(price),avg(price),count(*) from goods group by cate_name;


    -- 查询所有价格大于 平均价格 的商品，并且按 价格降序 排序 order desc

    -- 1 查询平局价格(avg_price)
    select avg(price) as avg_price from goods;


    -- 2 使用子查询
    select * from goods where price > (select avg(price) as avg_price from goods) order by price desc;


    -- 查询每种类型中最贵的电脑信息(难)

    -- 1 查找 每种类型 中 最贵的 max_price 价格
    select cate_name,max(price) as max_price from goods group by cate_name;


    -- 2 关联查询 inner join 每种类型 中最贵的物品信息
    -- select * from goods 
    -- inner join
    -- (select cate_name,max(price) as max_price from goods group by cate_name) as max_price_goods
    -- on goods.cate_name=max_price_goods.cate_name and goods.price=max_price_goods.max_price;
    select * from goods
    inner join
    (select cate_name,max(price) as max_price from goods group by cate_name) as max_price_goods
    on goods.cate_name = max_price_goods.cate_name and goods.price = max_price_goods.max_price;


    -- 创建"商品分类"表

    第一步    创建表 (商品种类表 goods_cates )

    create table if not exists goods_cates(
        id int unsigned primary key auto_increment,
        name varchar(40) not null
    );



    第二步    同步 商品分类表 数据 将商品的所有 (种类信息) 写入到 (商品种类表) 中

    -- 按照 分组 的方式查询 goods 表中的所有 种类(cate_name)
    select cate_name from goods group by cate_name;

    -- (注意) 把查询出来的 结果 写入 goods_cates 表里去 ( insert into ) 只插入name
    insert into goods_cates(name) (select cate_name from goods group by cate_name);



    第三部 同步 商品表 数据 通过 goods_cates 数据表来更新 goods 表

    -- 因为要通过 goods_cates表 更新 goods 表 所以要把两个表连接起来
    select * from goods inner join goods_cates on goods.cate_name = goods_cates.name;

    -- 把 商品表 goods 中的 cate_name 全部替换成 商品分类表中的 商品id ( update ... set )
    update (goods inner join goods_cates  on goods.cate_name = goods_cates.name) set goods.cate_name = goods_cates.id;

    第四部 修改表结构

    -- 查看表结构(注意 两个表中的 外键类型需要一致)
    desc goods;

    -- 修改表结构 alter table 字段名字不同 change,把 cate_name 改成 cate_id int unsigned not null
    alter table goods change cate_name cate_id int unsigned not null;



    -- 创建 商品品牌表 goods_brands

    第一步 创建 "商品品牌表" 表
    -- 第一种方式 先创建表
    create table goods_brands (
        id int unsigned primary key auto_increment,
        name varchar(40) not null);

    -- 插入数据 brand_name(分组)
    -- 按照 分组 的方式查询 goods 表中的所有 种类(brand_name)
    select brand_name from goods group by brand_name;
    --(注意) 把查询出来的 结果 写入 goods_brands 表里去 ( insert into ) 只插入name
    insert into goods_brands(name) (select brand_name from goods group by brand_name);


    -- 第二种方式 创建表的同时插入数据(了解,不建议使用)
    create table goods_brands (
        id int unsigned primary key auto_increment,
        name varchar(40) not null) select brand_name as name from goods group by brand_name;

    第二步 同步数据
    -- 通过goods_brands数据表来更新goods数据表 g.brand_name=b.id
    update (goods inner join goods_brands on goods.brand_name = goods_brands.name) set goods.brand_name = goods_brands.id;

    第三部 修改表结构
    -- 通过alter table语句修改表结构 brand_id int unsigned not null
    alter table goods change brand_name brand_id int unsigned not null;






    -- 外键的使用(了解)

    -- 向goods表里插入任意一条数据
    insert into goods (name,cate_id,brand_id,price) values('老王牌拖拉机', 10, 10,'6666');

    -- 约束 数据的插入 使用 外键 foreign key
    -- alter table goods add foreign key (brand_id) references goods_brands(id);
    alter table goods add foreign key (cate_id) references goods_cates(id);
    alter table goods add foreign key(brand_id) references goods_brands(id);

    -- 失败原因 老王牌拖拉机 delete
    -- delete from goods where name="老王牌拖拉机";
    delete from goods where name="老王牌拖拉机";

    -- 创建表的同时设置外键 (注意 goods_cates 和 goods_brands 两个表必须事先存在)
    create table goods(
        id int primary key auto_increment not null,
        name varchar(40) default '',
        price decimal(5,2),
        cate_id int unsigned,
        brand_id int unsigned,
        is_show bit default 1,
        is_saleoff bit default 0,
        foreign key(cate_id) references goods_cates(id),
        foreign key(brand_id) references goods_brands(id)
    );


    -- 如何取消外键约束

    -- 需要先获取外键约束名称,该名称系统会自动生成,可以通过查看表创建语句来获取名称
    show create table goods;

    -- 获取名称之后就可以根据名称来删除外键约束
    alter table goods drop foreign key goods_ibfk_1;
    alter table goods drop foreign key goods_ibfk_2;


    总结:在实际开发中,很少会使用到外键约束,会极大的降低表更新的效率

    -- python与mysql的交互使用
    -- 基本流程 1 connection对象 |2 cursor对象 |3 关闭cursor |4 关闭connection

    -- sql注入  ' or 1 or '
    select * from goods where name = '%s' % name

    select * from goods ;
`;
  cmOption = {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    mode: 'text/x-mysql',
    theme: 'dracula dark'
  };
  sqlCodeFocus(code: string): void {
    if(code == '请输入代码') {
      this.code = '';
    }
  }
  sqlCodeBlur(code: string): void {
    if(String(code).trim() == '') {
      this.code = '请输入代码';
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .CodeMirror {
  height: 800px;
}
::v-deep .cm-s-solarized.CodeMirror {
  box-shadow: none;
}
</style>
