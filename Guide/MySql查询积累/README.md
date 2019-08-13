```
override fun getUserInfoByID(userId:String): UserInfo{
        val sql = "SELECT FLOOR(SUM(offline_time - online_time)/86400000)AS level, id, name, figure " +
                "FROM (" +
                "SELECT id,name,figure,online_time,offline_time " +
                "FROM cu_sys.online_history x RIGHT JOIN cu_sys.user_info y ON x.user_id=y.id WHERE y.id = '" + userId + "'" +
                ") o GROUP BY id;"
        val user = UserInfo()
        jdbcTemplate.queryForList(sql).map{
            user.id = it["id"].toString()
            user.name = it["name"].toString()
            user.figure = it["figure"].toString()
            user.level = it["level"].toString()
        }
        return user
    }
```

连接查询 https://blog.csdn.net/zjt980452483/article/details/82945663

这里用到了分组求和，子查询，右连接

WHERE的优先级高于GROUP BY 所以直接可以去掉子查询

```
val sql = "SELECT FLOOR(SUM(offline_time - online_time)/86400000+1)AS level, id, name, figure " +
        "FROM cu_sys.online_history x RIGHT JOIN cu_sys.user_info y ON x.user_id=y.id WHERE y.id = '" + userId + "'" +
        "GROUP BY id;"
```


也可以保留子查询，先对一个表进行处理再进行连接
```
val sql = "SELECT level, id, name, figure " +
         "FROM(" +
         "SELECT FLOOR(SUM(offline_time - online_time)/86400000+1)AS level, user_id FROM cu_sys.online_history GROUP BY user_id" +
         ") x LEFT JOIN cu_sys.user_info u" +
         "ON x.user_id = u.id WHERE u.id = '" + userId + "';"
```
