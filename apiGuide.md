###  user api's  -------------------
# -- create user 
localhost:5000/user/create

payload => {
    "accountId": 1274256,
    "name": "Mohd Rejoan",
    "password": "123",
    "email": "mohd.rejoan@gmail.com",
    "phoneNumber": "01643941863",
    "accountType": "teacher"
}


# -- log in user
localhost:5000/user/log-in

payload => {
    "accountId": 1274256,
    "password": "123",
    "accountType": "teacher"
}


###  notice api's  -------------------- 
# -- create new notice
localhost:5000/notice/create

payload => {
    "title": string,
    "description": string,
    "files": string,
    "noticeType": string,
}

# -- update notice 
localhost:5000/notice/update
# -- delete notice
localhost:5000/notice/delete

# -- get all notice list
localhost:5000/notice/all
# -- get classroom notice list
localhost:5000/notice/classroom
# -- get training center notice list
localhost:5000/notice/training-center
# -- get BISHEW notice list
localhost:5000/notice/bishew


### connects or communication api's list --------------
# -- get all student list
localhost:5000/connect/list
# -- new message apies (not created yet)




### share center api's ------------------------

# -- upload a file
localhost:5000/share/send

# -- download a file
localhost:5000/share/files:[file-number]

# -- all file list 
localhost:5000/share/files

# -- all computer list
localhost:5000/computer/all

# -- online computer list 
localhost:5000/computer/online

# -- offline computer list 
localhost:5000/computer/offline



### profile api's -------------------------

 



Send homework request like this . 215 is user id => 
localhost:5000/hw/upload/:215

