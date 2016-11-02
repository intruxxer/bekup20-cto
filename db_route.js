exports.list = function(req, res){
    req.getConnection(function(err, connection){
      connection.query('SELECT * FROM bekup_cto', function(err, rows){
          if(err){
	      console.log('Error SELECT-ing : %s.', err);
	  }
	  var item_object_from_db = { page_title: "Item from DB", data: rows};
          res.render('./db_template_view.ejs', item_object_from_db);
      }); 
    });
};
