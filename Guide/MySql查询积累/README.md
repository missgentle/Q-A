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
