export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'الطريقة غير مدعومة' });
    return;
  }

  const { word } = req.body;

  if (!word) {
    res.status(400).json({ message: 'يرجى إرسال كلمة' });
    return;
  }

  res.status(200).json({ message: `تم دفّ الكلمة: ${word}` });
}