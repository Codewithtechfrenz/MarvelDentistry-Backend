const { Validator } = require("node-input-validator");
const db = require('../models/db.js');
//const { uploadToPinata } = require('../config/pinata.js');
const pinataService = require('../config/pinata.js');
// Create Enquiry
exports.createEnquiry = (req, res) => {
    const reqData = req.body;

    const v = new Validator(reqData, {
        first_name: 'required|string|maxLength:100',
        last_name: 'required|string|maxLength:100',
        phone_number: 'required|string|maxLength:20',
        email_id: 'required|email',
        description: 'required|string'
    });

    v.check().then((matched) => {
        if (!matched) {
            const error_message = Object.values(v.errors).map(e => e.message).join(", ");
            return res.json({ status: 0, message: error_message });
        }

        const insertQuery = `
            INSERT INTO enquiries
            (first_name, last_name, phone_number, email_id, description)
            VALUES (?, ?, ?, ?, ?)`;

        db.mainDb(insertQuery, [
            reqData.first_name,
            reqData.last_name,
            reqData.phone_number,
            reqData.email_id,
            reqData.description
        ], (err, result) => {
            if (err) return res.json({ status: 0, message: "DB error" });

            return res.json({
                status: 1,
                message: "Enquiry submitted successfully",
                id: result.insertId
            });
        });
    });
};


// List Enquiries
exports.getEnquiries = (req, res) => {
    db.mainDb(`SELECT * FROM enquiries ORDER BY id DESC`, [], (err, result) => {
        if (err) return res.json({ status: 0, message: "DB error" });
        return res.json({ status: 1, data: result });
    });
};


// Get Single Enquiry
exports.getEnquiry = (req, res) => {
    const id = req.params.id;

    db.mainDb(`SELECT * FROM enquiries WHERE id=?`, [id], (err, result) => {
        if (err) return res.json({ status: 0, message: "DB error" });
        if (result.length === 0) return res.json({ status: 0, message: "Enquiry not found" });

        return res.json({ status: 1, data: result[0] });
    });
};


exports.updateEnquiry = (req, res) => {
    const reqData = req.body;

    const v = new Validator(reqData, {
        id: 'required|integer',
        first_name: 'required|string|maxLength:100',
        last_name: 'required|string|maxLength:100',
        phone_number: 'required|string|maxLength:20',
        email_id: 'required|email',
        description: 'required|string'
    });

    v.check().then((matched) => {
        if (!matched) {
            const error_message = Object.values(v.errors)
                .map(e => e.message)
                .join(", ");
            return res.json({ status: 0, message: error_message });
        }

        const updateQuery = `
            UPDATE enquiries
            SET first_name=?, last_name=?, phone_number=?, email_id=?, description=?
            WHERE id=?`;

        db.mainDb(
            updateQuery,
            [
                reqData.first_name,
                reqData.last_name,
                reqData.phone_number,
                reqData.email_id,
                reqData.description,
                reqData.id
            ],
            (err, result) => {
                if (err) {
                    return res.json({ status: 0, message: "DB error" });
                }

                if (result.affectedRows === 0) {
                    return res.json({ status: 0, message: "Enquiry not found" });
                }

                return res.json({
                    status: 1,
                    message: "Enquiry updated successfully"
                });
            }
        );
    });
};

// Delete Enquiry
exports.deleteEnquiry = (req, res) => {
    const id = req.body.id;

    db.mainDb(`DELETE FROM enquiries WHERE id=?`, [id], (err, result) => {
        if (err) return res.json({ status: 0, message: "DB error" });
        if (result.affectedRows === 0)
            return res.json({ status: 0, message: "Enquiry not found" });

        return res.json({ status: 1, message: "Enquiry deleted successfully" });
    });
};

//----------------------------------------------------

// Create Blog
exports.createBlog = (req, res) => {
    const reqData = req.body;

    const v = new Validator(reqData, {
        heading: 'required|string|maxLength:255',
        title: 'required|string|maxLength:255',
        image: 'required|string',
        description: 'required|string'
    });

    v.check().then((matched) => {
        if (!matched) {
            const error_message = Object.values(v.errors).map(e => e.message).join(", ");
            return res.json({ status: 0, message: error_message });
        }

        const insertQuery = `
            INSERT INTO blogs (heading, title, image, description)
            VALUES (?, ?, ?, ?)`;

        db.mainDb(insertQuery, [
            reqData.heading,
            reqData.title,
            reqData.image,
            reqData.description
        ], (err, result) => {
            if (err) return res.json({ status: 0, message: "DB error" });

            return res.json({
                status: 1,
                message: "Blog created successfully",
                id: result.insertId
            });
        });
    });
};

// List Blogs
exports.getBlogs = (req, res) => {
    db.mainDb(`SELECT * FROM blogs ORDER BY id DESC`, [], (err, result) => {
        if (err) return res.json({ status: 0, message: "DB error" });
        return res.json({ status: 1, data: result });
    });
};


// Get Single Blog
exports.getBlog = (req, res) => {
    const id = req.params.id;

    db.mainDb(`SELECT * FROM blogs WHERE id=?`, [id], (err, result) => {
        if (err) return res.json({ status: 0, message: "DB error" });
        if (result.length === 0) return res.json({ status: 0, message: "Blog not found" });

        return res.json({ status: 1, data: result[0] });
    });
};


// Update Blog
exports.updateBlog = (req, res) => {
    const reqData = req.body;

    const v = new Validator(reqData, {
        id: 'required|integer',
        heading: 'required|string|maxLength:255',
        title: 'required|string|maxLength:255',
        image: 'required|string',
        description: 'required|string'
    });

    v.check().then((matched) => {
        if (!matched) {
            const error_message = Object.values(v.errors).map(e => e.message).join(", ");
            return res.json({ status: 0, message: error_message });
        }

        const updateQuery = `
            UPDATE blogs
            SET heading=?, title=?, image=?, description=?
            WHERE id=?`;

        db.mainDb(updateQuery, [
            reqData.heading,
            reqData.title,
            reqData.image,
            reqData.description,
            reqData.id
        ], (err, result) => {
            if (err) return res.json({ status: 0, message: "DB error" });

            return res.json({ status: 1, message: "Blog updated successfully" });
        });
    });
};

// Delete Blog
exports.deleteBlog = (req, res) => {
    const id = req.body.id;

    db.mainDb(`DELETE FROM blogs WHERE id=?`, [id], (err, result) => {
        if (err) return res.json({ status: 0, message: "DB error" });
        if (result.affectedRows === 0)
            return res.json({ status: 0, message: "Blog not found" });

        return res.json({ status: 1, message: "Blog deleted successfully" });
    });
};

//------------------------------------------------------------------------------------


// CREATE
exports.createDoctor = (req, res) => {
  const { name, specialist, image, description } = req.body;

  const sql =
    "INSERT INTO doctors (name, specialist, image, description) VALUES (?, ?, ?, ?)";

  db.mainDb()(
    sql,
    [name, specialist, image, description],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Doctor created",
        id: result.insertId,
      });
    }
  );
};

// READ ALL
exports.getDoctors = (req, res) => {
  db.mainDb()("SELECT * FROM doctors", (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

// READ ONE
exports.getDoctorById = (req, res) => {
  const { id } = req.params;

  db.mainDb()(
    "SELECT * FROM doctors WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result[0]);
    }
  );
};

// UPDATE
exports.updateDoctor = (req, res) => {
  const { id } = req.params;
  const { name, specialist, image, description } = req.body;

  const sql =
    "UPDATE doctors SET name=?, specialist=?, image=?, description=? WHERE id=?";

  db.mainDb()(sql, [name, specialist, image, description, id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Doctor updated" });
  });
};

// DELETE
exports.deleteDoctor = (req, res) => {
  const { id } = req.params;

  db.mainDb()("DELETE FROM doctors WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Doctor deleted" });
  });
};
//-------------------------------------------------------



exports.uploadToPinata = async (req, res) => {
    try {
        console.log("FILE RECEIVED:", req.file);
 
        if (!req.file) {
            return res.json({
                status: 0,
                message: "Image required",
            });
        }
 
        const result = await pinataService.uploadToPinata(req.file);
 
        return res.json({
            status: 1,
            message: "Uploaded successfully",
            image_url: result.url,
            ipfs_hash: result.hash,
        });
 
    } catch (err) {
        console.log("CONTROLLER ERROR:", err.message);
 
        return res.json({
            status: 0,
            message: err.message,
        });
    }
};

//--------------------------------------------------------------------------------------


exports.createTitle = (req, res) => {
    const reqData = req.body;

    const v = new Validator(reqData, {
        title_code: 'required|string|maxLength:10',
        title_name: 'required|string|maxLength:50'
    });

    v.check().then((matched) => {
        if (!matched) {
            const error_message = Object.values(v.errors).map(e => e.message).join(", ");
            return res.json({ status: 0, message: error_message });
        }

        const insertQuery = `
            INSERT INTO title_master (title_code, title_name)
            VALUES (?, ?)`;

        db.mainDb(insertQuery, [
            reqData.title_code,
            reqData.title_name
        ], (err, result) => {
            if (err) return res.json({ status: 0, message: "DB error" });

            return res.json({
                status: 1,
                message: "Title created successfully",
                id: result.insertId
            });
        });
    });
};




exports.getTitles = (req, res) => {
    db.mainDb(`SELECT * FROM title_master ORDER BY id DESC`, [], (err, result) => {
        if (err) return res.json({ status: 0, message: "DB error" });
        return res.json({ status: 1, data: result });
    });
};



exports.getTitle = (req, res) => {
    const id = req.params.id;

    db.mainDb(`SELECT * FROM title_master WHERE id=?`, [id], (err, result) => {
        if (err) return res.json({ status: 0, message: "DB error" });
        if (result.length === 0) return res.json({ status: 0, message: "Title not found" });

        return res.json({ status: 1, data: result[0] });
    });
};



exports.updateTitle = (req, res) => {
    const reqData = req.body;

    const v = new Validator(reqData, {
        id: 'required|integer',
        title_code: 'required|string|maxLength:10',
        title_name: 'required|string|maxLength:50'
    });

    v.check().then((matched) => {
        if (!matched) {
            const error_message = Object.values(v.errors)
                .map(e => e.message)
                .join(", ");
            return res.json({ status: 0, message: error_message });
        }

        const updateQuery = `
            UPDATE title_master
            SET title_code=?, title_name=?
            WHERE id=?`;

        db.mainDb(updateQuery, [
            reqData.title_code,
            reqData.title_name,
            reqData.id
        ], (err, result) => {
            if (err) return res.json({ status: 0, message: "DB error" });

            if (result.affectedRows === 0) {
                return res.json({ status: 0, message: "Title not found" });
            }

            return res.json({
                status: 1,
                message: "Title updated successfully"
            });
        });
    });
};



exports.deleteTitle = (req, res) => {
    const id = req.body.id;

    db.mainDb(`DELETE FROM title_master WHERE id=?`, [id], (err, result) => {
        if (err) return res.json({ status: 0, message: "DB error" });

        if (result.affectedRows === 0) {
            return res.json({ status: 0, message: "Title not found" });
        }

        return res.json({
            status: 1,
            message: "Title deleted successfully"
        });
    });
};



exports.getTitleDropdown = (req, res) => {
    const query = `
        SELECT id, title_name 
        FROM title_master 
        ORDER BY title_name ASC`;

    db.mainDb(query, [], (err, result) => {
        if (err) {
            return res.json({ status: 0, message: "DB error" });
        }

        return res.json({
            status: 1,
            data: result
        });
    });
};





exports.getDashboardCounts = (req, res) => {

    const query = `
        SELECT 
            (SELECT COUNT(*) FROM blogs) AS total_blogs,
            (SELECT COUNT(*) FROM enquiries) AS total_enquiries,
            (SELECT COUNT(*) FROM doctors) AS total_doctors
    `;

    db.mainDb(query, [], (err, result) => {
        if (err) {
            return res.json({ status: 0, message: "DB error" });
        }

        return res.json({
            status: 1,
            data: result[0]
        });
    });
};