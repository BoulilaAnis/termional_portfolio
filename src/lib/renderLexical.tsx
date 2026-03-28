export const renderLexical = (node: any, index: number = 0): any => {
  if (!node) return null

  if (node.text) {
    let content: any = node.text
    if (node.format & 1) content = <strong key={`bold-${index}`}>{content}</strong>
    if (node.format & 2) content = <em key={`italic-${index}`}>{content}</em>
    if (node.format & 8) content = <code key={`code-${index}`}>{content}</code>
    return content
  }

  if (node.children) {
    const children = node.children.map((child: any, i: number) => renderLexical(child, i))

    switch (node.type) {
      case 'root':
        return <div key="root">{children}</div>
      case 'paragraph':
        return <p key={`p-${index}`}>{children}</p>
      case 'heading':
        const Tag = node.tag as any
        return <Tag key={`h-${index}`}>{children}</Tag>
      case 'list':
        const ListTag = node.tag === 'ol' ? 'ol' : 'ul'
        return <ListTag key={`list-${index}`}>{children}</ListTag>
      case 'listitem':
        return <li key={`li-${index}`}>{children}</li>
      case 'link':
        return (
          <a
            key={`link-${index}`}
            href={node.fields?.url}
            target={node.fields?.newTab ? '_blank' : '_self'}
            className="text-main underline hover:text-white transition-colors"
          >
            {children}
          </a>
        )
      default:
        return <span key={`node-${index}`}>{children}</span>
    }
  }
  return null
}
