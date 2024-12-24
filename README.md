# โจทย์

1 : สมัครบริการ Mongo และ Redis มาใส่ใน .env เพื่อให้ใช้งานได้ :white_check_mark:

2 : สมัครบริการ email มาเพื่อให้ มาใส่ใน .env เพื่อให้ส่งอีเมลล์จาก Backend ได้จริงๆ :white_check_mark:

3 : รันโปรเจ็กต์ backend นี้บน Localhost ตัวเองให้ได้ และ Deploy ขึ้น server ให้ได้ :white_check_mark:

4 : สมัคร Postman และลิสต์เส้น endpoint ทุกเส้นที่สามารถทดสอบการลงทะเบียนด้วย email และ การ Login จาก Postman ได้จริงๆ (อย่าลืมทำ Psotman Script เพื่อเก็บ token เอาไว้ด้วย เพื่อเอาไว้ส่งไปกับ endpoint อื่นๆที่จำเป็นต้องล็อกอินก่อนถึงจะเรียกใช้ได้) โดย URL ให้เรียกไปที่ server จริงที่นักศึกษา deploy ตัว backend เอาไว้ :white_check_mark:

5 : สร้าง schema "Product" ขึ้นมาเพื่อเก็บสินค้า โดยให้สร้างเส้น CRUD ในการ สร้าง อัพเดท อ่าน และลบ สินค้าแต่ละชิ้นได้ :white_check_mark:

6 : สร้าง schema "Order" ขึ้นมาเพื่อให้ทำเก็บการสั่งซื้อ(หรือ order) ของของ user คนหนึ่งๆได้ โดยสามารถดีไซน์ได้เอง แต่หลักๆต้องมีสิ่งที่จำเป็น เช่น สินค้าที่สั่งซื้อใน order นี้มีอะไรบ้าง (เชื่อมโยงกับสินค้า) , วันที่สร้างออร์เดอร์ , วันที่อัพเดทออร์เดอร์ , ราคารวม ฯลฯ ที่จำเป็น รวมทั้งเส้น CRUD เพื่อที่จะสร้าง , อัพเดท , อ่านorderทั้งหมด, อ่านorderทั้งหมดของuserคนหนึ่ง , อ่านorderตามเลข order, และลบ order :white_check_mark:

(ข้อ 5 และ 6 ให้เพิ่มไปใน Postman ด้วย)
--------------------------------------------

โดยการตรวจสอบจะเป็นดังนี้

1. ทางบริษัทจะตรวจทุกอย่างจาก POSTMAN โดยให้ผู้ทดสอบ export เป็นไฟล์์มา หรือส่งมาเป็น Curl ก็ได้ และทางบริษัทจะรันตรวจสอบทุกอย่างตามโจทย์ข้างต้นว่าได้ออกมาใช้งานได้หรือไม่

2. ส่งลิงก์ github repo มาให้ตรวจโค้ด โดยตั้งเป็น public เอาไว้
--------------------------------------------
หมายเหตุ
- โจทย์นี้มีผลโดยตรงกับการประเมิณการฝึกงาน หาโจทย์บังคับทำไม่สำเร็จ จะถือว่าฝึกไม่ผ่าน เพราะเป็นมาตรรฐานที่ต้องทำให้ได้


--------------------------------------------------
# สิ่งที่ทำ
1. สมัครบริการ Mongo และ Redis มาใส่ใน .env เพื่อให้ใช้งานได้ สำเร็จ
2. สมัครบริการ email มาเพื่อให้ มาใส่ใน .env เพื่อให้ส่งอีเมล์จาก Backend ได้จริงๆ โดยเมื่อเรียก api postman ผ่าน เส้น register จะมี email ส่งไปเพื่อยืนยัน
3. รันโปรเจ็กต์ backend นี้บน Localhost ตัวเองให้ได้ และ Deploy ขึ้น server ให้ได้ สำเร็จ โดย ลิงค์ที่ deploy ขึ้น server คือ https://oreq-internship.onrender.com/
4. สมัคร Postman และลิสต์เส้น endpoint ทุกเส้นที่สามารถลงทะเบียนด้วย email และการ Login จาก POSTman ได้จริงๆ และได้สร้าง Psotman Script เพื่อเก็บ token ไว้เรียบร้อย หลังจากที่เรียกใช้ endpoint /login
5. สร้าง schema Product และสร้าง CRUD ของ Product สำเร็จ
6. สร้าง schema Order และสร้าง CRUD ของ Order สำเร็จ โดยสามารถ สร้าง ลบ แก้ไข เรียกดู order ทั้งหมด เรียกดู order จาก user และ เรียกดู order จากรหัส order การสร้าง order จะต้อง login เพื่อได้รับ token ก่อน สร้าง order เท่านั้น ผู้ทำได้เขียน middleware เพื่อ verifytoken ขึ้นมาใหม่ไว้สำหรับการทดสอบในโปรเจคนี้เรียบร้อย

# โค้ดและไฟล์ที่สร้าง
1.ผู้ทำได้สร้างโฟลเดอร์ขึ้นใหม่ใน routes/v1 โดยเพิ่ม โฟลเดอร์เป็น newroutes ในโฟลเดอร์มีไฟล์ orderRoutes.js และ productRoutes.js เพื่อจัดเก็บ endpoint ของ order และ product

2.ในไฟล์ app.js ผู้ทำได้ใช้ readdirSync จาก 'fs' เพื่อจัดการกับการอ่านไฟล์ และได้เขียน endpoint ขึ้นใหม่เป็น  ```readdirSync('./routes/v1/newroutes').map((r)=> app.use("/api/v1", require('./routes/v1/newroutes/'+r)))``` ซึ่งจะทำการ loop อ่านไฟล์ ทั้งหมดใน folder ของ newroutes และ สร้าง endpoint ขึ้น โดยจะช่วยสร้างความยืดหยุ่นและไม่เกิดความซ้ำซ้อนในการเขียน

3.ผู้ทำได้สร้าง middlewares ขึ้นใน โฟลเดอร์ middleware ชื่อไฟล์ verifyaccess.js เพื่อมาเทสเกี่ยวกับการ ตรวจสอบ token ซึ่งทำขึ้นมาเพื่อใช้ทดสอบกับโปรเจคนี้เท่านั้น ผู้ทำทราบดีว่าหากนำไปใช้ในงานจริง อาจจะยังไม่เหมาะสมเท่าที่ควร

4. ผู้ทำได้สร้างไฟล์ productControllers.js และ orderControllers.js เพื่อจัดการเกี่ยวกับ Product และ Order ในระบบ CRUD

5. ในไฟล์ authControllers.js ฟังก์ชัน login ผู้ทำได้แก้ไขโค้ดในส่วนของ '''const foundUserId = ```foundUser.userId``` เป็น ```foundUser._id``` เนื่องจาก userId เป็น null ผู้ทำจึงขอแก้ไข เพื่อทดสอบ หากผิดพลาดประการใดขออภัยมา ณ ที่นี้ด้วย


-------------------------------------------------------------------------

# Jaidee-POS-Backend


git rm -r --cached .

PORT=3001 npm run start
## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.jaidee.cloud/jaidee-pos/jaidee-pos-backend.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.jaidee.cloud/jaidee-pos/jaidee-pos-backend/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
# hdgtest_nodejs_backend
# hdgtest_nodejs_backend
