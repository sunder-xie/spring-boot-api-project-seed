package com.sunder.whats.utils;

import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.converter.PicturesManager;
import org.apache.poi.hwpf.converter.WordToHtmlConverter;
import org.apache.poi.hwpf.usermodel.PictureType;
import org.apache.poi.xwpf.converter.core.FileImageExtractor;
import org.apache.poi.xwpf.converter.core.FileURIResolver;
import org.apache.poi.xwpf.converter.xhtml.XHTMLConverter;
import org.apache.poi.xwpf.converter.xhtml.XHTMLOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;
import java.util.List;


/**
 * doc 和docx
 * word 转换成html
 */
public class WordToHtml {

	/**
	 * 2007版本word转换成html f
	 * ileName : docx 的文件名
	 *  htmlname：生成的html名称 带有后缀
	 *   imagepath: docx中的图片保存的路径 
	 *   filepath : docx所在的目录
	 * 生成的html
	 * @return 
	 * @throws IOException
	 */

	public static String word2007ToHtml(String fileName, String htmlName, String imagepath, String filepath)
			throws IOException {
		final String file = filepath + fileName;
		String htmlpath ="";
		File f = new File(file);
		if (!f.exists()) {
			System.out.println("Sorry File does not Exists!");
		} else {
				// 1) 加载word文档生成 XWPFDocument对象
				InputStream in = new FileInputStream(f);
				XWPFDocument document = new XWPFDocument(in);

				// 2) 解析 XHTML配置 (这里设置IURIResolver来设置图片存放的目录)
				File imageFolderFile = new File(filepath);
				XHTMLOptions options = XHTMLOptions.create().URIResolver(new FileURIResolver(imageFolderFile));
				options.setExtractor(new FileImageExtractor(imageFolderFile));
				options.setIgnoreStylesIfUnused(false);
				options.setFragment(true);

				// 3) 将 XWPFDocument转换成XHTML
				OutputStream out = new FileOutputStream(new File(filepath + htmlName));
				XHTMLConverter.getInstance().convert(document, out, options);
				htmlpath = filepath+ File.separator+htmlName;
				repalceToBase64Image(htmlpath);
			
		}
		return htmlpath;
	}
	/**
	 * 
	 * @param fileName
	 *            doc名称
	 * @param htmlName
	 *            生成的html名称
	 * @param imagepath
	 *            生成的图片路径
	 * @param filepath
	 *            doc的目录 合成称html的目录
	 * @throws IOException
	 * @throws TransformerException
	 * @throws ParserConfigurationException
	 */

	public static String word2003ToHtml(String fileName, String htmlName, final String imagepath, String filepath)
			throws IOException, TransformerException, ParserConfigurationException {
		String htmlpath = "";
		final String file = filepath + fileName;
		InputStream input = new FileInputStream(new File(file));
		HWPFDocument wordDocument = new HWPFDocument(input);
		WordToHtmlConverter wordToHtmlConverter = new WordToHtmlConverter(
				DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument());
		// 设置图片存放的位置
		wordToHtmlConverter.setPicturesManager(new PicturesManager() {
			public String savePicture(byte[] content, PictureType pictureType, String suggestedName, float widthInches,
                                      float heightInches) {
				File imgPath = new File(imagepath);
				if (!imgPath.exists()) {// 图片目录不存在则创建
					imgPath.mkdirs();
				}
				File file = new File(imagepath + suggestedName);
				try {
					OutputStream os = new FileOutputStream(file);
					os.write(content);
					os.close();
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
				return imagepath + suggestedName;
			}
		});

		// 解析word文档
		wordToHtmlConverter.processDocument(wordDocument);
		Document htmlDocument = wordToHtmlConverter.getDocument();
		File htmlFile = new File(filepath + htmlName);
		OutputStream outStream = new FileOutputStream(htmlFile);

		DOMSource domSource = new DOMSource(htmlDocument);
		StreamResult streamResult = new StreamResult(outStream);

		TransformerFactory factory = TransformerFactory.newInstance();
		Transformer serializer = factory.newTransformer();
		serializer.setOutputProperty(OutputKeys.ENCODING, "GB2312");
		serializer.setOutputProperty(OutputKeys.INDENT, "yes");
		serializer.setOutputProperty(OutputKeys.METHOD, "html");
		serializer.transform(domSource, streamResult);
		outStream.close();
		htmlpath = filepath+ File.separator+htmlName;
		repalceToBase64Image(htmlpath);
		return htmlpath;
	}
	
	public static void writeFile(String htmlstr, String htmlpath) {
		PrintWriter writer = null;
		try {
			File file = new File(htmlpath);
			// 下面三行解决中文乱码
			writer = new PrintWriter(file, "GB2312");
			writer.write(htmlstr);
			writer.flush();
		} catch (FileNotFoundException fnfe) {
			fnfe.printStackTrace();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		} finally {
			if (writer != null){
				writer.close();
			}
				
		}
	}

	public static void repalceToBase64Image(String htmlpath) {
		String htmlstr = HtmlReader.readHtml(htmlpath).toString();
		List<String> imagesrclist = HtmlReader.getImgSrc(htmlstr);
		String base64Image = "data:image/jpg;base64,";
		for (String imagesrc : imagesrclist) {
			base64Image = base64Image + ImageBase64Util.getImageStr(imagesrc);
			htmlstr = htmlstr.replace(imagesrc, base64Image);
			base64Image = "data:image/jpg;base64,";
		}
		writeFile(htmlstr, htmlpath);
	}
	
	
	public static void main(String[] args) throws IOException, TransformerException, ParserConfigurationException {
		// word2003ToHtml( "D://1.doc", "D://6666.html", "test","d:");
		String file2007 = word2007ToHtml("微信授权流程.docx", "微信授权流程.html", "f:/test/", "f:/doc/");
		//String filename= word2003ToHtml("1.doc", "doc.html", "f:/test/", "f:/doc/");
		//System.out.println(filename);
		System.out.println(file2007);
		//File file = new File(filename);
		File file07 =  new File(file2007);
		System.out.println(file07.getAbsolutePath());
		//System.out.println(file.getAbsolutePath());
	}

}
