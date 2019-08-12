```
override fun getUserInfoByID(userId:String): UserInfo{
        val sql = "SELECT FLOOR(SUM(offline_time - online_time)/86400000)AS level , user_id, name,figure " +
                "FROM (" +
                "SELECT user_id,name,figure,online_time,offline_time " +
                "FROM cu_sys.online_history x INNER JOIN cu_sys.user_info y ON x.user_id=y.id WHERE y.id = '" + userId +"'" +
                ") o GROUP BY user_id;"
        val user = UserInfo()
        jdbcTemplate.queryForList(sql).map{
            user.id = it["user_id"].toString()
            user.name = it["name"].toString()
            user.figure = it["figure"].toString()
            user.level = it["level"].toString()
        }
        return user
    }
```
