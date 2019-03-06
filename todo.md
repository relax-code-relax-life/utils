# todo

- template()

    当模板中的某个值不存在时，会出错到catch{}。导致返回字符串为空。
    应当不存在的值显示为undefined或null。
    
- dist/index.d.ts
    
    npm run build自动生成的声明文件，需要在最后 export default result 改为 export = result ， webStorm才能正确提示。
    应当配置不需要手动更改。