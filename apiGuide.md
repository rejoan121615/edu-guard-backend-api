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

# -- see all user account (done)
localhost:5000/user/all
# -- see all student account (done)
localhost:5000/user/student



###  notice api's  -------------------- 
# -- create new notice (done)
localhost:5000/notice/create

payload => {
    "title": string,
    "description": string,
    "files": string,
    "noticeType": string,
}

# -- update notice (done)
localhost:5000/notice/update

payload => {
    "id": number,
    "title": string,
    "description": string,
    "files": string,
    "noticeType": string,
}
# -- delete notice (done)
localhost:5000/notice/delete

# -- get all notice list (done)
localhost:5000/notice/all
# -- get classroom notice list (done)
localhost:5000/notice/classroom
# -- get training center notice list (done)
localhost:5000/notice/training-center
# -- get BISHEW notice list (pending for decision)
localhost:5000/notice/bishew


### connects or communication api's list --------------

# -- new message send  (done)
localhost:5000/message/send



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

