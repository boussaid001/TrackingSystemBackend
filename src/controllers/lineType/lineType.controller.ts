import { LineTypeService } from '../../services/lineType.service';

export async function GetLineTypeByCode(req, res) {
    const code = req.params.code;
    const lineTypeService = new LineTypeService();
    const linetype = await lineTypeService.GetLineTypeByCode(code);
    return res.status(200).json({ linetype: linetype });
}
