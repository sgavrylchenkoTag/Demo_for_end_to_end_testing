#  Installation
* Install [Node.js](https://nodejs.org/) version >= 12.
* Install [Git](https://git-scm.com/).
* Install [Yarn](https://yarnpkg.com/en/docs/install#debian-stable).

[comment]: <> (* Download this project or run the following command in terminal or bash)

[comment]: <> (```git clone https://github.com/sergey0602/demo-for-end-to-end-testing.git```.)
* Open terminal or bash in root folder with package.json file and run the
 following command ```yarn install``` to install the project dependencies. To
  install the mock server dependencies, run ```yarn install``` inside mockServer folder.
* To run the project need to launch frontend part from root folder and 
  backend part from mockServer folder. Backend will be started on 3000 port 
  and frontend on 6289 port. Run the frontend part in development 
  mode from the root folder
 with the command ```yarn run dev```. To run backend use ```yarn start``` 
  from mockServer folder.
* To run tests use ```yarn run cy:open```


