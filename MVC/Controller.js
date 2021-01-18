// ! 아래는 Controllers/links/index.js 예시다.

const Url = require("../../models").url;
const utils = require("../../modules/utils");

module.exports = {
    get: async(req, res) => {
      const result = await Url.findAll()
      res.status(200).json(result);
    },

    post: async(req, res) => {
        const reqUrl = req.body.url;

        if(!utils.isValidUrl(reqUrl)) {                  
            return res.sendStatus(400);
        }

        utils.getUrlTitle(reqUrl, (err, title) => {                
            if(err) {
              return res.sendStatus(400);
            }

            Url.findOrCreate({
                where : {
                  url : reqUrl
                },
                defaults : {            
                  title : title 
                }                   
            })
            .then(([result, created]) => {
                if(!created) {
                    return res.status(201).json(result);
                }
                res.status(201).json(result);
            })
            .catch(error => {
                console.log(error);
                res.sendStatus(500);
            })
        })
    },

    redirect: (req, res) => {
        Url.findOne({
            where : {
                id : req.params.id
            }
        })
        .then(result => {
            if(result) {
                return result.update({
                    visits: result.visits + 1
                });
            } else {
                res.sendStatus(204);
            }
        })
        .then(result => {
            res.redirect(result.url);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
    }
}