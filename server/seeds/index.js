const { Dataset_Model} = require('../models/mongo');


Dataset_Model.insertMany([
    {
        name: 'Leads',
        table: 'temp_lead',
        attributes: ['id', 'email', 'lead_types', 'created_date'],
        query_select: [
            {
                field : 'id',
                value : 'id'
            },
            {
                field : 'email',
                value : 'email'
            },
            {
                field : 'lead_types',
                value : '(CASE WHEN lead_type = 1 THEN "Rfq" WHEN lead_type = 2 THEN "Inquiry " END) AS lead_types'
            },
            {
                field : 'created_date',
                value : 'DATE_FORMAT(created_at, "%Y-%m-%d") AS created_date'
            }
        ],
        query_where : {
            company_field : 'company_id',
            event_field   : 'event_id',
            event : true,
            company : true,
            default : false
        },
        query_count: 'COUNT(id) AS number_of_records',
        query_analytic: {
            select : 'LOWER(MONTHNAME(created_date)) AS labels, COUNT(id) AS data',
            group  : 'GROUP BY LOWER(MONTHNAME(created_date))'
        }  
    },
    {
        name: 'Inquires',
        table: 'enquires',
        attributes: ['id', 'product_name', 'supplier_name', 'supplier_company', 'supplier_email', 'buyer_name', 'buyer_email', 'buyer_company', 'buyer_website', 'created_date'],
        query_select: [
            {
                field : 'id',
                value : 'enquires.id'
            },
            {
                field : 'product_name',
                value : 'products.name AS product_name'
            },
            {
                field : 'supplier_name',
                value : 'supplier.name AS supplier_name'
            },
            {
                field : 'supplier_company',
                value : 'supplier.company AS supplier_company'
            },
            {
                field : 'supplier_email',
                value : 'supplier.username AS supplier_email'
            },
            {
                field : 'buyer_name',
                value : 'buyer.name AS buyer_name'
            },
            {
                field : 'buyer_email',
                value : 'buyer.username AS buyer_email'
            },
            {
                field : 'buyer_company',
                value : 'buyer.company AS buyer_company'
            },
            {
                field : 'buyer_website',
                value : 'buyer.website AS buyer_website'
            },
            {
                field : 'created_date',
                value : 'DATE_FORMAT(enquires.registeredon, "%Y-%m-%d") AS created_date'
            }
        ],
        query_where : {
            company_field : 'enquires.company_id',
            event_field : 'enquires.event_id',
            default_field : 'enquires.is_delete="0"',
            event : true,
            company : true,
            default : true
        },
        query_join : "INNER JOIN products ON enquires.product_id = products.id INNER JOIN people AS supplier ON enquires.supplier_user_id = supplier.id  INNER JOIN people AS buyer ON enquires.user_id = buyer.id",
        query_count: 'COUNT(enquires.id) AS number_of_records',
        query_analytic: {
            select : 'LOWER(MONTHNAME(registeredon)) AS labels, COUNT(id) AS data',
            group  : 'GROUP BY LOWER(MONTHNAME(registeredon))'
        }  
    },
    {
        name: 'Rfq',
        table: 'rfq',
        attributes: ['id', 'name', 'company', 'website',  'email', 'phone', 'country', 'product_name', 'product_company', 'product_website', 'product_company_country', 'quantity', 'distribution_count', 'created_date'],
        query_select: [
            {
                field : 'id',
                value : 'rfq.id'
            },
            {
                field : 'name',
                value : 'people.name'
            },
            {
                field : 'company',
                value : 'people.company'
            },
            {
                field : 'website',
                value : 'people.website'
            },
            {
                field : 'email',
                value : 'people.username AS email'
            },
            {
                field : 'phone',
                value : 'people.mobile AS phone'
            },
            {
                field : 'country',
                value : 'countries.label AS country'
            },
            {
                field : 'product_name',
                value : 'rfq.product_name AS product_name'
            },
            {
                field : 'product_company',
                value : 'supplier.company AS product_company'
            },
            {
                field : 'product_website',
                value : 'supplier.website AS product_website'
            },
            {
                field : 'product_company_country',
                value : 'br.label AS   product_company_country'
            },
            {
                field : 'quantity',
                value : 'rfq.target_order_quantity AS quantity'
            },
            {
                field : 'distribution_count',
                value : 'COUNT(rfq.id) AS distribution_count'
            },
            {
                field : 'created_date',
                value : 'DATE_FORMAT(rfq.added_on, "%Y-%m-%d") AS created_date'
            }
        ],
        query_where : {
            company_field : 'rfq.company_id',
            event_field : 'rfq.event_id',
            default_field : 'rfq.is_delete = 0 AND rfq.preferred_payment_method NOT LIKE "%,%" GROUP BY rfq.id',
            event : true,
            company : true,
            default : true
        },
        query_join : "INNER JOIN people ON rfq.o2o_id = people.id INNER JOIN countries ON people.country_id = countries.id  INNER JOIN rfq_distribution ON rfq.id = rfq_distribution.rfq_id LEFT JOIN products ON rfq.product_id = products.id LEFT JOIN people AS supplier  ON products.supplier_user_id = supplier.id  LEFT JOIN countries AS br ON supplier.country_id = br.id",
        query_count: 'COUNT(rfq.id) AS number_of_records',
        query_analytic: {
            select : 'LOWER(MONTHNAME(added_on)) AS labels, COUNT(id) AS data',
            group  : 'GROUP BY LOWER(MONTHNAME(added_on))'
        }  
    }, 
    {
        name: 'Products',
        table: 'products',
        attributes: ['id', 'name', 'supplier_name', 'price', 'metric', 'min_qty', 'min_sale_qty',  'created_date'],
        query_select: [
            {
                field : 'id',
                value : 'products.id'
            },
            {
                field : 'name',
                value : 'products.name'
            },
            {
                field : 'supplier_name',
                value : 'people.company AS supplier_name'
            },
            {
                field : 'price',
                value : 'products.price AS price'
            },
            {
                field : 'metric',
                value : 'products.metric AS metric'
            },
            {
                field : 'min_qty',
                value : 'products.min_qty AS min_qty'
            },
            {
                field : 'min_qty',
                value : 'products.min_sale_qty AS min_sale_qty'
            },
            {
                field : 'created_date',
                value : 'DATE_FORMAT(products.added_on, "%Y-%m-%d") AS created_date'
            }
        ],
        query_where : {
            company_field : 'products.company_id',
            event : false,
            company : true,
            default : false
        },
        query_join : "INNER JOIN people ON products.supplier_user_id = people.id",
        query_count: 'COUNT(products.id) AS number_of_records',
        query_analytic: {
            select : 'LOWER(MONTHNAME(added_on)) AS labels, COUNT(id) AS data',
            group  : 'GROUP BY LOWER(MONTHNAME(added_on))'
        }  
    }, 
    {
        name: 'Calls',
        table: 'calls',
        attributes: ['id', 'caller', 'caller_email', 'caller_company', 'receiver', 'receiver_email', 'receiver_company', 'call_status', 'created_date'],
        query_select: [
            {
                field : 'id',
                value : 'calls.id'
            },
            {
                field : 'caller',
                value : 'p1.name AS caller'
            },
            {
                field : 'caller_email',
                value : 'p1.username AS caller_email'
            },
            {
                field : 'caller_company',
                value : 'p1.company AS caller_company'
            },
            {
                field : 'receiver',
                value : 'p2.name AS receiver'
            },
            {
                field : 'receiver_email',
                value : 'p2.username AS receiver_email'
            },
            {
                field : 'receiver_company',
                value : 'p2.company AS receiver_company'
            },
            {
                field : 'call_status',
                value : '(CASE WHEN calls.status = 0 THEN "Calling" WHEN calls.status = 1 THEN "Accepted" WHEN calls.status = 2 THEN "Ended" WHEN calls.status = 3 THEN "Rejected" WHEN calls.status = 4 THEN "Missed" WHEN calls.status = 5 THEN "Failed" END) AS call_status'
            },
            {
                field : 'created_date',
                value : 'DATE_FORMAT(calls.created_at, "%Y-%m-%d") AS created_date'
            }
        ],
        query_where : {
            company_field : 'calls.company_id',
            event_field : 'calls.event_id',
            event : true,
            company : true,
            default : false
        },
        query_join : "LEFT JOIN people as p1 on calls.caller_id = p1.id LEFT JOIN people as p2 on calls.callee_id = p2.id",
        query_count: 'COUNT(calls.id) AS number_of_records',
        query_analytic: {
            select : 'LOWER(MONTHNAME(created_at)) AS labels, COUNT(id) AS data',
            group  : 'GROUP BY LOWER(MONTHNAME(created_at))'
        } 
    }, 
    {
        name: 'Meetings',
        table: 'meetings',
        attributes: ['meetings_id', 'duration', 'notes', 'timezone', 'creator', 'name', 'company', 'email', 'phone', 'country', 'starts_at', 'ends_at', 'created_date'],
        query_select: [
            {
                field : 'meetings_id',
                value : 'meetings.id AS meetings_id '
            },
            {
                field : 'duration',
                value : 'meetings.duration'
            },
            {
                field : 'notes',
                value : 'meetings.notes'
            },
            {
                field : 'timezone',
                value : 'meetings.timezone'
            },
            {
                field : 'creator',
                value : 'meeting_participant.creator'
            },
            {
                field : 'name',
                value : 'people.name'
            },
            {
                field : 'company',
                value : 'people.company'
            },
            {
                field : 'email',
                value : 'people.username AS email'
            },
            {
                field : 'phone',
                value : 'people.mobile AS phone'
            },
            {
                field : 'country',
                value : 'countries.label AS country'
            },
            {
                field : 'starts_at',
                value : 'DATE_FORMAT(meetings.starts_at, "%Y-%m-%d") AS starts_at'
            },
            {
                field : 'ends_at',
                value : 'DATE_FORMAT(meetings.ends_at, "%Y-%m-%d") AS ends_at'
            },
            {
                field : 'created_date',
                value : 'DATE_FORMAT(created_at, "%Y-%m-%d") AS created_date'
            }
        ],
        query_where : {
            event_field : 'meetings.event_id',
            event : true,
            company : false,
            default : false
        },
        query_join : "LEFT JOIN meeting_participant ON meetings.id = meeting_participant.meeting_id LEFT JOIN people ON people.id = meeting_participant.o2o_id INNER JOIN countries ON people.country_id = countries.id",
    },
    {
        name: 'Attendees',
        table: 'attendees',
        attributes: ['attendees_id', 'attendees_name', 'attendees_email', 'attendees_mobile', 'created_date'],
        query_select: [
            {
                field : 'attendees_id',
                value : 'attendees.id AS attendees_id'
            },
            {
                field : 'attendees_name',
                value : 'people.name AS attendees_name'
            },
            {
                field : 'attendees_email',
                value : 'people.username AS attendees_email'
            },
            {
                field : 'attendees_mobile',
                value : 'people.mobile AS attendees_mobile'
            },
            {
                field : 'created_date',
                value : 'DATE_FORMAT(attendees.created_at, "%Y-%m-%d") AS created_date'
            }
        ],
        query_where : {
            company_field : 'attendees.company_id',
            default_field : 'people.deleted_at IS NULL GROUP BY people.id',
            event_field : 'attendees.event_id',
            event : true,
            company : true,
            default : true
        },
        query_join : "INNER JOIN people ON attendees.o2o_id = people.id",
        query_count: 'COUNT(attendees.id) AS number_of_records',
        query_analytic: {
            select : 'LOWER(MONTHNAME(created_at)) AS labels, COUNT(id) AS data',
            group  : 'GROUP BY LOWER(MONTHNAME(created_at))'
        } 
    },
    {
        name: 'Connections',
        table: 'friends',
        attributes: ['connection_id', 'sender_email', 'sender_name', 'sender_company', 'connection_email', 'connection_name', 'connection_company', 'connection_status' ,'created_date'],
        query_select: [
            {
                field : 'connection_id',
                value : 'friends.id AS connection_id'
            },
            {
                field : 'sender_email',
                value : 'p1.username AS sender_email'
            },
            {
                field : 'sender_name',
                value : 'p1.name AS sender_name"'
            },
            {
                field : 'sender_company',
                value : 'p1.company AS sender_company'
            },
            {
                field : 'connection_email',
                value : 'p2.username AS connection_email'
            },
            {
                field : 'connection_name',
                value : 'p2.name AS connection_name'
            },
            {
                field : 'connection_company',
                value : 'p2.company AS connection_company'
            },
            {
                field : 'connection_status',
                value : '(CASE WHEN friends.status = 0 THEN "Pending" WHEN friends.status = 1 THEN "Accept" WHEN friends.status = 2 THEN "Block" WHEN friends.status = 3 THEN "Unfriend" END) AS connection_status'
            },
            {
                field : 'created_date',
                value : 'DATE_FORMAT(friends.added_on, "%Y-%m-%d") AS created_date'
            }
        ],
        query_where : {
            company_field : 'friends.company_id',
            event : false,
            company : true,
            default : false
        },
        query_join : "LEFT JOIN people AS p1 ON friends.sender_id = p1.id LEFT JOIN people AS p2 ON friends.reciever_id = p2.id",
        query_count: 'COUNT(friends.id) AS number_of_records',
        query_analytic: {
            select : 'LOWER(MONTHNAME(added_on)) AS labels, COUNT(id) AS data',
            group  : 'GROUP BY LOWER(MONTHNAME(added_on))'
        } 
    },
    {
        name: 'Visitors',
        table: 'people',
        attributes: ['id', 'name', 'email', 'mobile', 'company', 'created_at'],
        query_select: [
            {
                field : 'id',
                value : 'id'
            },
            {
                field : 'name',
                value : 'name'
            },
            {
                field : 'email',
                value : 'username AS email'
            },
            {
                field : 'mobile',
                value : 'mobile'
            },
            {
                field : 'company',
                value : 'company'
            },
            {
                field : 'created_at',
                value : 'DATE_FORMAT(registered_on, "%Y-%m-%d") AS created_at'
            }
        ],
        query_where : {
            company_field : 'company_id',
            event_field   : 'event_id',
            default_field : 'user_kind=0 AND deleted_at IS NULL',
            event : true,
            company : true,
            default : true
        },
        query_count: 'COUNT(id) AS number_of_records',
        query_analytic: {
            select : 'LOWER(MONTHNAME(registered_on)) AS labels, COUNT(id) AS data',
            group  : 'GROUP BY LOWER(MONTHNAME(registered_on))'
        } 
    },
    {
        name: 'Exhibitors',
        table: 'people',
        attributes: ['id', 'name', 'email', 'mobile', 'company', 'created_at'],
        query_select: [
            {
                field : 'id',
                value : 'id'
            },
            {
                field : 'name',
                value : 'name'
            },
            {
                field : 'email',
                value : 'username AS email'
            },
            {
                field : 'mobile',
                value : 'mobile'
            },
            {
                field : 'company',
                value : 'company'
            },
            {
                field : 'created_at',
                value : 'DATE_FORMAT(registered_on, "%Y-%m-%d") AS created_at'
            }
        ],
        query_where : {
            company_field : 'company_id',
            event_field   : 'event_id',
            default_field : 'user_kind=1 AND deleted_at IS NULL',
            event : true,
            company : true,
            default : true
        },
        query_count: 'COUNT(id) AS number_of_records',
        query_analytic: {
            select : 'LOWER(MONTHNAME(registered_on)) AS labels, COUNT(id) AS data',
            group  : 'GROUP BY LOWER(MONTHNAME(registered_on))'
        } 
    },
    {
        name: 'All Registered',
        table: 'people',
        attributes: ['o2o_id', 'name', 'email', 'company', 'country', 'category', 'phone', 'mobile', 'fax', 'zip', 'registered_on', 'updated_on'],
        query_select: [
            {
                field : 'o2o_id',
                value : 'people.id AS  o2o_id'
            },
            {
                field : 'name',
                value : 'people.name'
            },
            {
                field : 'email',
                value : 'people.username AS email'
            },
            {
                field : 'company',
                value : 'people.company'
            },
            {
                field : 'country',
                value : 'countries.label AS country'
            },
            {
                field : 'category',
                value : 'categories.name AS category'
            },
            {
                field : 'phone',
                value : 'people.phone'
            },
            {
                field : 'mobile',
                value : 'people.mobile'
            },
            {
                field : 'fax',
                value : 'people.fax'
            },
            {
                field : 'zip',
                value : 'people.zip'
            },
            {
                field : 'registered_on',
                value : 'DATE_FORMAT(registered_on, "%Y-%m-%d")'
            },
            {
                field : 'updated_on',
                value : 'DATE_FORMAT(updated_on, "%Y-%m-%d")'
            }
        ],
        query_where : {
            company_field : 'people.company_id',
            event_field   : 'attendees.event_id',
            default_field : 'people.deleted_at IS NULL GROUP BY people.id',
            event : true,
            company : true,
            default : true
        },
        query_join : "INNER JOIN attendees ON  people.id = attendees.o2o_id INNER JOIN user_category ON people.id =  user_category.o2o_user_id INNER JOIN categories ON user_category.category1 = categories.id INNER JOIN countries ON people.country_id = countries.id",
        query_count: 'COUNT(people.id) AS number_of_records',
        query_analytic: {
            select : 'LOWER(MONTHNAME(registered_on)) AS labels, COUNT(id) AS data',
            group  : 'GROUP BY LOWER(MONTHNAME(registered_on))'
        } 
    }
]).then((docs) => {
   console.log('data added', docs);
}).catch((err) => {
    console.log(err);
})

