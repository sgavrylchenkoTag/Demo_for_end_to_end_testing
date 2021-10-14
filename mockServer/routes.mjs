import Router from 'koa-router';
const router = new Router();

const data = {
  fields: [
    { field: 'id', displayName: 'ID', type: 'number' },
    { field: 'city', displayName: 'City', type: 'string' },
    { field: 'state', displayName: 'State', type: 'string' },
    { field: 'zipCode', displayName: 'ZipCode', type: 'string' },
    { field: 'beds', displayName: 'Beds', type: 'number' },
  ],
  values: [
    { id: 11594125, beds: 3, city: "DALLAS", state: "TX", zipCode: "75224" },
    { id: 11594124, beds: 4, city: "GARLAND", state: "TX", zipCode: "75043" },
    { id: 11594123, beds: 3, city: "San Antonio", state: "TX", zipCode: "78254" },
    { id: 11594122, beds: 4, city: "San Antonio", state: "TX", zipCode: "78253" },
    { id: 11594121, beds: 4, city: "San Antonio", state: "TX", zipCode: "78260" },
    { id: 11593946, beds: 3, city: "PLANO", state: "TX", zipCode: "75093" },
    { id: 11593945, beds: 3, city: "DALLAS", state: "TX", zipCode: "75243" }
  ],
}

router.get('/fields', async (ctx) => {
  ctx.body = { data: data.fields };
});

router.get('/data', async (ctx) => {
  ctx.body = { data: data.values, totalCount: data.values.length };
});

router.post('/record', async (ctx) => {
  const record = ctx.request.body;

  if (record.beds && record.city && record.state && record.zipCode) {
    const newRecord = { id: Date.now(), ...record };
    data.values.push(newRecord);
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: newRecord
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Wrong data.'
    };
  }
});

export default router;
