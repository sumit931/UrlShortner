exports.validateSchema = (schema) => {
    return (req, res, next) => {
      try {
        if (schema.path) {
          console.log("testing1");
          if (isEmpty(req.params)) {
            return ("Path params missing", 400, {
                info: "Please provide path parameters",
              });
          }
  
          const validation = schema.path.validate(req.params);
          if (validation.error)
            return ("Path Parameter verfication failed", 400, validation.error);
        }
  
        //Req body validation
        if (schema.body) {
          if (isEmpty(req.body)) {
            return ("Req body missing", 400, {
                details: "Please provide a request body",
                schema: schema.body.validate(req.body).error,
              });
          }
          const validation = schema.body.validate(req.body, { convert: false });

          if (validation.error){

            return next(("Req body verfication failed", 400, validation.error));
          }
        }
        //Query params validation
        if (schema.query) {

          if (req.query) {
            const validation = schema.query.validate(req.query);
            if (validation.error)
              return ("Query params verification failed", 400, validation.error);
          }
        }
        return next();
      } catch (err) {
        console.log("testing4");
        console.log(err);
        req.res.status(500).json({ message: "Unexpected Error occured" });
      }
    };
  };
  
  function isEmpty(obj) {
    if (obj === undefined || obj === null) return true;
    if (!obj.constructor === Object) return true;
    if (Object.entries(obj).length) return false;
    else return true;
  }
  